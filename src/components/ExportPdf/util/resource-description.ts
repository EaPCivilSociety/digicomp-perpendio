export default function resourceDescription({
  author,
  publication,
  year,
}: {
  year?: string;
  publication?: string;
  author?: string;
}) {
  let result = '';

  if (author) {
    result = author;
  }
  if (publication) {
    if (author) {
      result += ` - ${publication}`;
    } else {
      result = publication;
    }
  }
  if (year) {
    if (publication) {
      result += `, ${year}`;
    } else if (author) {
      result += ` - ${year}`;
    } else {
      result = year;
    }
  }

  return result;
}
