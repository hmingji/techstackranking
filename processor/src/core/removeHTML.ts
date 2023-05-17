export function removeHTML(str: string) {
  return str
    .replace(/(<([^>]+)>)/gi, '')
    .replace('- job post', '')
    .trim();
}
