$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$magick = Join-Path $root "tools\ImageMagickPortable\magick.exe"
$pngquantCandidates = @(
  (Join-Path $root "tools\pngquant\pngquant.exe"),
  "C:\Program Files\Adobe\Adobe Photoshop 2022\pngquant.exe",
  "pngquant"
)
$pngquant = $pngquantCandidates | Where-Object {
  if ($_ -eq "pngquant") {
    Get-Command $_ -ErrorAction SilentlyContinue
  }
  else {
    Test-Path $_
  }
} | Select-Object -First 1
$sourceDir = Join-Path $root "tmp\characters-chibi"
$outDir = Join-Path $root "tmp\characters-pixel-128"
$previewDir = Join-Path $outDir "preview"

if (-not (Test-Path $magick)) {
  throw "Missing ImageMagick portable executable: $magick"
}

New-Item -ItemType Directory -Force -Path $outDir, $previewDir | Out-Null

$characters = @("aida", "mira", "nuosi", "sela", "tori", "elaine")
$manifest = @()

Add-Type -AssemblyName System.Drawing

function Is-BackgroundPixel($color) {
  if ($color.A -eq 0) {
    return $true
  }

  $isMagenta = ([math]::Abs([int]$color.R - 255) + [math]::Abs([int]$color.G) + [math]::Abs([int]$color.B - 255)) -lt 150
  if ($isMagenta) {
    return $true
  }

  $max = [math]::Max($color.R, [math]::Max($color.G, $color.B))
  $min = [math]::Min($color.R, [math]::Min($color.G, $color.B))
  $avg = ($color.R + $color.G + $color.B) / 3
  return (($max - $min) -le 18 -and $avg -ge 215)
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
      if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h -or $seen[$x, $y]) {
        continue
      }

      $seen[$x, $y] = $true
      if (-not (Is-BackgroundPixel $bitmap.GetPixel($x, $y))) {
        continue
      }

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

foreach ($id in $characters) {
  $source = Join-Path $sourceDir "$id-source.png"
  $work = Join-Path $outDir "$id-work.png"
  $final = Join-Path $outDir "$id.png"
  $preview = Join-Path $previewDir "$id-preview.png"

  if (-not (Test-Path $source)) {
    throw "Missing source image: $source"
  }

  & $magick $source `
    -alpha set `
    -background none `
    -filter Lanczos `
    -resize "128x256" `
    -gravity center `
    -extent "128x256" `
    -fuzz "12%" `
    -transparent "#ff00ff" `
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

  $manifest += [pscustomobject]@{
    id = $id
    image = "tmp/characters-pixel-128/$id.png"
    preview = "tmp/characters-pixel-128/preview/$id-preview.png"
    width = 128
    height = 256
  }
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 (Join-Path $outDir "manifest.json")
Write-Host "Built $($manifest.Count) character pixel assets in $outDir"
