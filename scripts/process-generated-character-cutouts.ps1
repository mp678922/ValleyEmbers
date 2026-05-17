$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$singleId = $env:CHARACTER_ID
$singleSource = $env:CHARACTER_SOURCE
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$sourceDir = "C:\Users\yun\.codex\generated_images\019df2ac-ba12-7fa3-9963-6315f32a51e2"
$outDir = Join-Path $root "tmp\characters-chibi"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

if ($singleId -and $singleSource) {
  $ids = @($singleId)
  $sources = @([System.IO.FileInfo]::new($singleSource))
}
else {
  $ids = @("aida", "mira", "nuosi", "sela", "tori", "elaine")
  $sources = Get-ChildItem -File $sourceDir -Filter *.png | Sort-Object LastWriteTime | Select-Object -Last 6
}

if ($sources.Count -ne $ids.Count) {
  throw "Expected $($ids.Count) generated source images, found $($sources.Count)."
}

function Is-KeyPixel($color) {
  $dr = [math]::Abs([int]$color.R - 255)
  $dg = [math]::Abs([int]$color.G - 0)
  $db = [math]::Abs([int]$color.B - 255)
  return (($dr + $dg + $db) -lt 150)
}

function Is-BackgroundPixel($color) {
  if (Is-KeyPixel $color) {
    return $true
  }

  $max = [math]::Max($color.R, [math]::Max($color.G, $color.B))
  $min = [math]::Min($color.R, [math]::Min($color.G, $color.B))
  $avg = ($color.R + $color.G + $color.B) / 3
  return (($max - $min) -le 18 -and $avg -ge 215)
}

function Remove-ConnectedBackground($bitmap) {
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
}

function Draw-Cutout($sourcePath, $outPath) {
  $src = [System.Drawing.Bitmap]::new($sourcePath)
  try {
    $dst = [System.Drawing.Bitmap]::new(64, 128, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($dst)
    try {
      $graphics.Clear([System.Drawing.Color]::Transparent)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
      $scale = [math]::Min(58 / $src.Width, 123 / $src.Height)
      $drawW = [math]::Max(1, [int][math]::Round($src.Width * $scale))
      $drawH = [math]::Max(1, [int][math]::Round($src.Height * $scale))
      $destX = [int][math]::Floor((64 - $drawW) / 2)
      $destY = [int][math]::Floor((128 - $drawH) / 2)
      $graphics.DrawImage($src, $destX, $destY, $drawW, $drawH)

      Remove-ConnectedBackground $dst
      $dst.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $graphics.Dispose()
      $dst.Dispose()
    }
  }
  finally {
    $src.Dispose()
  }
}

$manifest = @()
for ($i = 0; $i -lt $ids.Count; $i++) {
  $id = $ids[$i]
  $outPath = Join-Path $outDir "$id.png"
  Copy-Item -LiteralPath $sources[$i].FullName -Destination (Join-Path $outDir "$id-source.png") -Force
  Draw-Cutout $sources[$i].FullName $outPath
  $manifest += [pscustomobject]@{
    id = $id
    image = "tmp/characters-chibi/$id.png"
    sourceImage = "tmp/characters-chibi/$id-source.png"
    width = 64
    height = 128
  }
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 (Join-Path $outDir "manifest.json")
Write-Host "Processed $($manifest.Count) transparent character PNG files in $outDir"
