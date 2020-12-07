export default function downloadFile(url: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Diversity and Inclusion Self-assessment`;
  anchor.target = '_blank';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
