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
