$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$magick = Join-Path $root "tools\ImageMagickPortable\magick.exe"
$pngquantCandidates = @(
  (Join-Path $root "tools\pngquant\pngquant.exe"),
  "C:\Program Files\Adobe\Adobe Photoshop 2022\pngquant.exe",
  "pngquant"
)
$pngquant = $pngquantCandidates | Where-Object {
  if ($_ -eq "pngquant") { Get-Command $_ -ErrorAction SilentlyContinue } else { Test-Path $_ }
} | Select-Object -First 1

$source = $env:PIXEL_SOURCE
if (-not $source) {
  $source = (Get-ChildItem -File "C:\Users\yun\.codex\generated_images\019df2ac-ba12-7fa3-9963-6315f32a51e2" -Filter *.png | Sort-Object LastWriteTime | Select-Object -Last 1).FullName
}

$outDir = Join-Path $root "tmp\pixel-scale-test"
$previewDir = Join-Path $outDir "preview"
New-Item -ItemType Directory -Force -Path $outDir, $previewDir | Out-Null
Copy-Item -LiteralPath $source -Destination (Join-Path $outDir "sela-source.png") -Force

function Is-BackgroundPixel($color) {
  if ($color.A -eq 0) { return $true }
  $isMagenta = ([math]::Abs([int]$color.R - 255) + [math]::Abs([int]$color.G) + [math]::Abs([int]$color.B - 255)) -lt 130
  if ($isMagenta) { return $true }
  $max = [math]::Max($color.R, [math]::Max($color.G, $color.B))
  $min = [math]::Min($color.R, [math]::Min($color.G, $color.B))
  $avg = ($color.R + $color.G + $color.B) / 3
  return (($max - $min) -le 18 -and $avg -ge 230)
}

function Clear-ConnectedBackground($path) {
  $bitmap = [System.Drawing.Bitmap]::new($path)
  try {
    $w = $bitmap.Width
    $h = $bitmap.Height
    $seen = New-Object 'bool[,]' $w, $h
    $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()
    for ($x = 0; $x -lt $w; $x++) {
      $queue.Enqueue([System.Drawing.Point]::new($x, 0))
      $queue.Enqueue([System.Drawing.Point]::new($x, $h - 1))
    }
    for ($y = 0; $y -lt $h; $y++) {
      $queue.Enqueue([System.Drawing.Point]::new(0, $y))
      $queue.Enqueue([System.Drawing.Point]::new($w - 1, $y))
    }
    while ($queue.Count -gt 0) {
      $point = $queue.Dequeue()
      $x = $point.X
      $y = $point.Y
      if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h -or $seen[$x, $y]) { continue }
      $seen[$x, $y] = $true
      if (-not (Is-BackgroundPixel $bitmap.GetPixel($x, $y))) { continue }
      $bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      $queue.Enqueue([System.Drawing.Point]::new($x + 1, $y))
      $queue.Enqueue([System.Drawing.Point]::new($x - 1, $y))
      $queue.Enqueue([System.Drawing.Point]::new($x, $y + 1))
      $queue.Enqueue([System.Drawing.Point]::new($x, $y - 1))
    }
    $tmpPath = "$path.alpha.png"
    $bitmap.Save($tmpPath, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $bitmap.Dispose()
  }
  Move-Item -LiteralPath "$path.alpha.png" -Destination $path -Force
}

function Build-Test($name, $filter) {
  $cleanSource = Join-Path $outDir "$name-clean-source.png"
  $work = Join-Path $outDir "$name-work.png"
  $final = Join-Path $outDir "$name.png"
  $preview = Join-Path $previewDir "$name-preview.png"

  & $magick $source `
    -alpha set `
    -fuzz "16%" `
    -transparent "#ff00ff" `
    -strip `
    "PNG32:$cleanSource"

  Clear-ConnectedBackground $cleanSource

  & $magick $cleanSource `
    -alpha set `
    -background none `
    -filter $filter `
    -resize "128x256" `
    -gravity center `
    -extent "128x256" `
    -strip `
    "PNG32:$work"

  Clear-ConnectedBackground $work

  if ($pngquant) {
    & $pngquant --force --output $final --speed 1 48 $work
  }
  else {
    & $magick $work +dither -colors 48 "PNG8:$final"
  }

  & $magick $final -filter point -resize "400%" $preview
  Remove-Item -LiteralPath $work -Force
  Remove-Item -LiteralPath $cleanSource -Force
}

Build-Test "sela-box-48" "box"
Build-Test "sela-lanczos-48" "lanczos"

Write-Host "Built pixel scale test images in $outDir"
