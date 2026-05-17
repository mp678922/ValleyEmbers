$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$singleId = $env:CHARACTER_ID
$singleSource = $env:CHARACTER_SOURCE
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$villagerPath = Join-Path $root "docs\data\villagers\villagers.json"
$outDir = Join-Path $root "public\assets\characters"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$canvasWidth = 128
$canvasHeight = 256
$maxDrawWidth = 118
$maxDrawHeight = 246

if ($singleId -and $singleSource) {
  $jobs = @(
    [pscustomobject]@{
      id = $singleId
      name = $singleId
      source = $singleSource
    }
  )
}
else {
  throw "This script currently requires CHARACTER_ID and CHARACTER_SOURCE."
}

function Is-KeyPixel($color) {
  $dr = [math]::Abs([int]$color.R - 255)
  $dg = [math]::Abs([int]$color.G - 0)
  $db = [math]::Abs([int]$color.B - 255)
  return (($dr + $dg + $db) -lt 80)
}

function Is-LightBackgroundPixel($color) {
  $max = [math]::Max($color.R, [math]::Max($color.G, $color.B))
  $min = [math]::Min($color.R, [math]::Min($color.G, $color.B))
  $avg = ($color.R + $color.G + $color.B) / 3
  return (($max - $min) -le 18 -and $avg -ge 228)
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
    $color = $bitmap.GetPixel($x, $y)
    if (-not (Is-KeyPixel $color) -and -not (Is-LightBackgroundPixel $color)) {
      continue
    }

    $bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    $queue.Enqueue([System.Drawing.Point]::new($x + 1, $y))
    $queue.Enqueue([System.Drawing.Point]::new($x - 1, $y))
    $queue.Enqueue([System.Drawing.Point]::new($x, $y + 1))
    $queue.Enqueue([System.Drawing.Point]::new($x, $y - 1))
  }
}

function Draw-CharacterAsset($sourcePath, $outPath) {
  $src = [System.Drawing.Bitmap]::new($sourcePath)
  try {
    Remove-ConnectedBackground $src

    $dst = [System.Drawing.Bitmap]::new($canvasWidth, $canvasHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($dst)
    try {
      $graphics.Clear([System.Drawing.Color]::Transparent)
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

      $scale = [math]::Min($maxDrawWidth / $src.Width, $maxDrawHeight / $src.Height)
      $drawW = [math]::Max(1, [int][math]::Round($src.Width * $scale))
      $drawH = [math]::Max(1, [int][math]::Round($src.Height * $scale))
      $destX = [int][math]::Floor(($canvasWidth - $drawW) / 2)
      $destY = [int][math]::Floor($canvasHeight - $drawH - 4)
      if ($destY -lt 0) {
        $destY = 0
      }

      $graphics.DrawImage($src, $destX, $destY, $drawW, $drawH)
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

$villagers = Get-Content -Encoding utf8 $villagerPath | ConvertFrom-Json
$villagerMap = @{}
foreach ($villager in $villagers) {
  $villagerMap[$villager.id] = $villager
}

foreach ($job in $jobs) {
  if (-not (Test-Path $job.source)) {
    throw "Missing source image: $($job.source)"
  }

  $outPath = Join-Path $outDir ("character_{0}.png" -f $job.id)
  Draw-CharacterAsset $job.source $outPath
}

$manifest = @()
foreach ($villager in $villagers) {
  $fileName = "character_{0}.png" -f $villager.id
  $filePath = Join-Path $outDir $fileName
  if (Test-Path $filePath) {
    $manifest += [pscustomobject]@{
      id = $villager.id
      name = $villager.name
      role = $villager.role
      image = "assets/characters/$fileName"
      width = $canvasWidth
      height = $canvasHeight
    }
  }
}

$manifest | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 (Join-Path $outDir "manifest.json")
Write-Host "Processed $($jobs.Count) character asset(s) into $outDir"
