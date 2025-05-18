import { dataStructure } from '../data.jsx';

export const columns = [
  {
    field: 'pointer',
    headerName: 'Wskaźnik',
    flex: 5,
    autoWidth: true,
    pinned: 'left',
  },
  {
    field: 'unit',
    headerName: 'Jednostka',
    headerAlign: 'left',
    align: 'left',
    flex: 2,
    pinned: 'left',
  },
];

dataStructure.years.forEach((year) => {
  columns.push({
    field: year.toString(),
    headerName: year.toString(),
    width: 100,
    headerAlign: 'center',
    align: 'center',
  });
});

export const rows = dataStructure.getYearlyData();
