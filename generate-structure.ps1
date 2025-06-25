# توليد هيكل ملفات المشروع وحفظه في ملف نصي
$projectPath = "C:\Users\majed\Desktop\tesr react\TroxoWebsite (3)\TroxoWebsite"
$outputPath = Join-Path $projectPath "project-structure.txt"

Get-ChildItem -Path $projectPath -Recurse |
    Select-Object FullName |
    ForEach-Object { $_.FullName.Replace($projectPath, "").TrimStart("\") } |
    Out-File -Encoding UTF8 -FilePath $outputPath

Write-Host "✅ تم حفظ هيكل المشروع في: $outputPath"
pause
