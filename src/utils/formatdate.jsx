// utils.js
export const formatDate = (date) => {
    const dateoptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const [day, month, year] = new Date(date)
    .toLocaleDateString('en-GB', dateoptions)
    .split(' ');
    return `${day} ${month}, ${year}`;
  };
  