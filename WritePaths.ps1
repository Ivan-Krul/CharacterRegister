function Write-ImagePaths
{
	$paths = Get-ChildItem -Path "image" -Recurse -File |
	    Sort-Object -Property {$_.LastWriteTime}

	[array]::Reverse($paths)

	$str = ""
	$const = "CharacterRegister";

	foreach ($path in $paths) {
		<# $path is the current item #>
		$filepath = $path.FullName
		$filepath = $filepath.Substring($filepath.IndexOf($const) + $const.Length + 1);
		Write-Host $filepath
		if ( $filepath -notmatch "Not mine" -and $filepath -notmatch "marathon" ) 
		{
			$str += "$filepath`n"
		}
	}
	
	New-Item -Path "./image" -Name "paths.txt" -Value $str -Force
}

function Write-PostPaths
{
	$partitionsPaths = Get-ChildItem -Path ".\posts" -Name

	$content = ""
	
	for($i = 0; $i -lt $partitionsPaths.Count - 1; $i += 1) {
		$content += "$($partitionsPaths[$i])`n"
		Write-Host $partitionsPaths[$i]
	}
	
	New-Item -Path "./posts" -Name "partitions.txt" -Value $content -Force
}

Write-PostPaths
Write-ImagePaths
