const monthFormatter = new Intl.DateTimeFormat('id-ID', { month: 'long' });

export function dateFormatter(dt, options = 'full') {
  const dateObj = new Date(dt);

  const year = dateObj.getFullYear();
  const month = monthFormatter.format(dateObj);
  const day = dateObj.getDate();

  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  if (options === 'full') {
    return `${day} ${month} ${year}, ${hour.toString().length > 1 ? hour : '0'+hour}:${minute} WIB`
  }
  return `${day} ${month} ${year}`
}