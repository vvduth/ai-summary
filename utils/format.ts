export function formatFileNameAsTitle(fileName: string) {
  // Remove the file extension
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  // Replace underscores and hyphens with spaces
  const formattedName = nameWithoutExtension.replace(/[_-]/g, " ");
  // Capitalize the first letter of each word
  const capitalizedTitle = formattedName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return capitalizedTitle;

}