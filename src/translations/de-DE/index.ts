export const de_DE = {
  translation: {
    actions: {
      version: "Version",
      save: "Speichern",
      edit: "Ändern",
      createNew: "Anlegen",
      reset: "Reset",
      grantPermission: "Erteilen",
      use: "Benutzt",
      unuse: "Ungenutzt",
      show: "Zeigen",
      pickFromGallery: "Datei aus Galerie wählen",
      takePhoto: "Foto machen",
      selectFile: "Datei wählen",
      create: "Anlegen",
      accept: "Okay",
      cancel: "Abbrechen",
      no: "Nein",
      ignore: "Ignorieren",
    },
    empty: {
      home: "Keine Elemente gespeichert. Du kannst ein neues Element mit dem Knopf unten auf dieser Seite anlegen.",
    },
    screens: {
      barcode: {
        scan: "Barcode scannen",
        edit: "Barcode bearbeiten",
      },
      settings: "Einstellungen",
      about: "Über",
      app: "BarcodeWallet",
    },
    dialogs: {
      confirm_barcode_as_used: {
        title: "Hinweis",
        content: "Wollen Sie diesen Code als genutzt markieren?",
      },
      delete_barcode: {
        title: "Löschen bestätigen",
        content:
          "Sind Sie sicher, dass Sie den Barcode löschen wollen mit dem Namen",
      },
      leave: {
        title: "Seite verlassen?",
        content:
          "Es könnten nicht gespeicherte Änderungen vorhanden sein. Seite wirklich verlassen?",
      },
      confirm_paste_clipboard: {
        title: "Zwischenablage",
        content:
          "Wir haben einen {{type}}-Code in der Zwischenablage erkannt. Wollen Sie ihn einfügen?",
      },
      confirm_duplicate_barcode: {
        title: "Duplikat",
        content: "Ein Barcode des selben Typs existiert bereits. Möchten Sie diesen trotzdem speichern?",
      },
    },
    toasts: {
      permissions: {
        camera: {
          notGranted: "Kamera-Berechtigung konnte nicht erteilt werden",
          successfullyGranted: "Berechtigung erfolgreich erteilt",
          failedToGrant: "Berechtigung konnte nicht erteilt werden",
          failedToAskForPermission:
            "Es ist ein Fehler bei der Abfrage der Kameraberechtigung aufgetreten",
        },
        media: {
          successfullyGranted: "Berechtigung erfolgreich erteilt",
          failedToGrant: "Berechtigung konnte nicht erteilt werden",
          failedToAskForPermission:
            "Es ist ein Fehler bei der Abfrage der Medienberechtigung aufgetreten",
        },
      },
      messages: {
        typeNotSupported: "Verzeihung, {{type}} wird nicht unterstützt",
        barcodeValidationFailed:
          "Nicht alle notwendigen Felder enthalten Werte.",
        tooManybarcodes:
          "Zu viele Codes erkannt. Bitte nur einen Barcode scannen.",
        cantCreateBackup: "Backup konnte nicht erzeugt werden.",
        failedToDeleteLocalFile: "Lokale Datei konnte nicht entfernt werden.",
        cantImport: "Konnte Daten nicht importieren",
        codeUsed: "Barcode wurde in den Bereich 'Benutzt' verschoben",
        codeRestored: "Barcode wurde nach oben verschoben",
      },
    },
    text: {
      editBarcode: {
        enterCode: "Code eingeben",
        codeFromFile: "Code von Datei",
        codeFromCamera: "Code von Kamera",
        name: "Name",
        description: "Beschreibung",
        expires: "Läuft ab",
        color: "Farbe",
        code: "Code",
        type: "Typ",
        text: "Text",
        file: "Datei",
        camera: "Kamera",
      },
      home: {
        addedOn: "Hinzugefügt am",
        usedOrExpired: "Benutzt oder abgelaufen",
        expiresOn: "Läuft ab am",
        expired: "Abgelaufen",
        used: "Genutzt",
        usageDate: "Genutzt am",
      },
      settings: {
        about: {
          title: "Über",
          description: "Mit ❤️ entwickelt von dlittig",
        },
        mediaPermission: {
          title: "Medienberechtigung",
          description:
            "Wird benötigt, damit Bilder aus der Galerie ausgewählt werden können",
        },
        cameraPermission: {
          title: "Kamera-Berechtigung",
          description: "Wird benötigt, damit Barcodes gescannt werden können",
        },
        import: {
          title: "Import",
          description: "Importiere Daten vom Dateisystem",
        },
        export: {
          title: "Export",
          description: "Daten in einer Datei speichern",
          dialog: "Backup speichern",
        },
      },
    },
  },
};
