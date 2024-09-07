export function base64ToFile(base64: string, fileName: string, contentType: string = 'application/octet-stream') {
  const [header, data] = base64.split(',');
  const byteCharacters = atob(data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = Array.from(slice).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return new File([blob], fileName, { type: contentType });
}


export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });

}


export function downloadFile(filename: string, fileBase64?: string): void {
  if (fileBase64 !== null && fileBase64 !== undefined) {
    const base64Data = fileBase64.split(',')[1];
    const contentType = fileBase64.split(';')[0].split(':')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${contentType.split('/')[1]}`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
