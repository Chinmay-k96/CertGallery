export const downloadBase64File = (base64Data, fileName) => {
    // Create a Blob from the Base64 string
    const byteCharacters = atob(base64Data.split(",")[1]); // Split to remove `data:image/png;base64,`
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: "image/png" });
  
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  
    // Clean up resources
    URL.revokeObjectURL(link.href);
  }