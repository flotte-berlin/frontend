export function getErrorMessage(error: any): string {
    const message =
      error?.error?.errors[0]?.message ||
      error?.error?.message ||
      error?.message ||
      '';
    if (
      message.includes('not provided') ||
      message.includes('violates not-null constraint')
    ) {
      return 'Nicht alle benötigten Felder wurden ausgefüllt.';
    }
    if (message.includes("TimeFrames with ids") && message.includes("overlapping")) {
        return "Überlappende Zeitscheibe - Ein Lastenrad kann zu einem Zeitpunkt nur an einem Standort stehen."
    }
    if (message.includes("Engagements with ids") && message.includes("overlapping")) {
        return "Überlappendes Engagement - Ein Lastenrad kann zu einem Zeitpunkt nur einem Aktiven über den selben Engagementtypen zugeordnet werden."
    }
    return message || 'Es ist ein Fehler aufgetreten. Prüfen Sie Ihre Eingaben oder versuchen Sie es später erneut.';
}
