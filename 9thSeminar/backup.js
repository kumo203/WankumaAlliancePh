// Given file backup generating script
// Ver 1.00_en
// 2012/03/27
// tomoya.yamanaka@yasc.info


////////////////////////////////////////////////////
// Logic to add the script into (SendTo) menu.　　//
// By double-clicking, you can install/uninstall. //
////////////////////////////////////////////////////
/////////////////////////////////
// Logic for install/uninstall //
/////////////////////////////////

var args      = WScript.Arguments;                                 // Givin parameters
var fso       = new ActiveXObject( "Scripting.FileSystemObject" ); // FileExists, DeleteFile, CopyFile
var shell     = new ActiveXObject( "WScript.Shell" );              // SpecialFolders, Popup

if ( args.length == 0 ) { // No parameter?

  // If no parameter, it means this script is double-clicked, and then need to run the logic for install/uninstall.
  var sendToPath = shell.SpecialFolders( "SendTo" );         // Getting (SendTo) folder path
  sendToPath     = sendToPath + "\\" + WScript.ScriptName;   // Getting this script name

  if ( fso.FileExists( sendToPath ) == false ) {	   // If this script already exists in (SendTo) folder?

    // This script doesn't exist yet, so show a dialog to ask the installation.
    var ret = shell.Popup( "Do you want to install " + sendToPath + "?", 0, "Install", 1 + 64 );

    if ( ret == 1 ) {	// [OK] button is pressed
      fso.CopyFile( WScript.ScriptFullName, sendToPath );  // Copy this scprint into (SendTo) folder.[Install]
    }

  } else {

    // This script exists already, so show a dialog to ask the uninstallation.
    var ret = shell.Popup( "Do you want to uninstall " + sendToPath + "?", 0, "Uninstall", 1 + 64 );

    if ( ret == 1 ) {	// [OK] button is pressed
      fso.DeleteFile( sendToPath, true );  // Delete this scprint from (SendTo) folder.[Uninstall]
    }
  }

  WScript.Quit();	// Exit from script
}
////////////////////////////////////////
// End of logic for install/uninstall //
////////////////////////////////////////

function getDateStr()
{
  var date = new Date();
  var year = date.getYear().toString();

  var month  = date.getMonth() + 1; // getMonth() returns 0~11. Thus, adjusting.
  if ( month < 10 ) {
    month = "0" + month;
  }

  var day  = date.getDate();
  if ( day < 10 ) {
    day = "0" + day;
  }

  return "_" + year + month + day;
}

var args            = WScript.Arguments;
var fso             = new ActiveXObject( "Scripting.FileSystemObject" );

if ( args.length == 0 ) {
  WScript.Echo( "Please D&D your target file to backup" );
  WScript.Quit();
}

var i = 0;
for ( i = 0; i < args.length; i++ ) {
  var anArg = args.item( i );
  if ( fso.FileExists( anArg ) ) {
    var ScriptPass= fso.GetParentFolderName( anArg );
    var NewName = ScriptPass + "\\" + fso.GetBaseName( anArg ) + getDateStr() + "." + fso.getExtensionName( anArg ) ;
    var num = 1;
    while ( fso.FileExists( NewName) ) {
      NewName = ScriptPass + "\\" + fso.GetBaseName( anArg ) + "_" + num + getDateStr() + "." + fso.getExtensionName( anArg );
      num++;
    }
    fso.CopyFile( anArg, NewName, false );
  } else {
    var NewName = anArg + getDateStr();
    var num = 1;
    while ( fso.FolderExists( NewName) ) {
      NewName = anArg+ "_" + num + getDateStr();
      num++;
    }
    fso.CopyFolder( anArg, NewName, false );
  }
}
