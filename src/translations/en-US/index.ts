export const en_US = {
  translation: {
    actions: {
      version: "Version",
      save: "Save",
      edit: "Edit",
      createNew: "Create new",
      reset: "Reset",
      grantPermission: "Grant permission",
      use: "Use",
      unuse: "Unuse",
      show: "Show",
      pickFromGallery: "Pick file from gallery",
      takePhoto: "Take photo",
      selectFile: "Select file",
      create: "Create",
      accept: "Okay",
      cancel: "Cancel",
      no: "No",
      ignore: "Ignore",
    },
    empty: {
      home: "No barcodes saved. You can store one with the button below",
    },
    screens: {
      barcode: {
        scan: "Scan Barcode",
        edit: "Edit barcode",
      },
      settings: "Settings",
      about: "About",
      app: "BarcodeWallet",
    },
    dialogs: {
      confirm_barcode_as_used: {
        title: "Notice",
        content: "Do you want to mark this code as used?",
      },
      delete_barcode: {
        title: "Confirm deletion",
        content: "Are you sure you want to delete the barcode",
      },
      leave: {
        title: "Leave screen?",
        content:
          "You might have unsaved changes. Are you sure you want to leave the screen?",
      },
      confirm_paste_clipboard: {
        title: "Clipboard",
        content: "We noticed that you have an {{type}} barcode in your clipboard. Do you want to paste it?",
      },
    },
    toasts: {
      permissions: {
        camera: {
          notGranted: "Camera permission has not been granted",
          successfullyGranted: "Permission successfully granted",
          failedToGrant: "Failed to grant permission",
          failedToAskForPermission:
            "An error occured while asking for Camera permission",
        },
        media: {
          successfullyGranted: "Permission successfully granted",
          failedToGrant: "Failed to grant permission",
          failedToAskForPermission:
            "An error occured while asking for Media permission",
        },
      },
      messages: {
        typeNotSupported: "Sorry, {{type}} is not supported",
        barcodeValidationFailed:
          "Not all necessary fields are containing values.",
        tooManybarcodes: "Got too many barcodes. Try to scan only one barcode.",
        cantCreateBackup: "Failed to create backup.",
        failedToDeleteLocalFile: "Failed to delete local file.",
        cantImport: "Could not import from file.",
        codeUsed: "Code has been moved to the 'Used' section",
        codeRestored: "Code has been moved up",
      },
    },
    text: {
      editBarcode: {
        enterCode: "Enter code",
        codeFromFile: "Code from file",
        codeFromCamera: "Code from camera",
        name: "Name",
        description: "Description",
        expires: "Expires",
        color: "Color",
        code: "Code",
        type: "Type",
        text: "Text",
        file: "File",
        camera: "Camera",
      },
      home: {
        addedOn: "Added on",
        usedOrExpired: "Used or expired",
        expiresOn: "Expires on",
        expired: "Expired",
        used: "Used",
        usageDate: "Used on",
      },
      settings: {
        about: {
          title: "About",
          description: "Built with ❤️ by dlittig",
        },
        mediaPermission: {
          title: "Grant media permission",
          description: "Used to read codes from photos in your gallery",
        },
        cameraPermission: {
          title: "Grant camera permission",
          description: "Used to scan codes with your camera",
        },
        import: {
          title: "Import",
          description: "Import data from file system",
        },
        export: {
          title: "Export",
          description: "Save your data to file",
          dialog: "Save backup",
        },
      },
    },
  },
};
