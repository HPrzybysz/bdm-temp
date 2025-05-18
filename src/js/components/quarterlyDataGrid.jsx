import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { Link, LinkOff } from '@mui/icons-material';
import { AnnotationTooltip } from './CustomTooltips';
import { dataStructure } from '../data.jsx';
import { useTheme, useMediaQuery } from '@mui/material';
import '../../scss/quarterlyDataGrid.scss';

const CustomCell = (params) => {
  const { pointer, hasAnnotation, annotation, annotationText } = params.row;

  return (
    <Box className="custom-cell">
      <span>{pointer}</span>
      {hasAnnotation && (
        <AnnotationTooltip
          placement="bottom-start"
          leaveDelay={200}
          title={<Box className="annotation-tooltip">{annotationText}</Box>}
        >
          <Box className="annotation-icon">{annotation}</Box>
        </AnnotationTooltip>
      )}
    </Box>
  );
};

const QuarterlyDataGrid = forwardRef((props, ref) => {
  const years = dataStructure.years;
  const quarters = dataStructure.quarters;
  const quarterRows = dataStructure.getQuarterlyData();
  const [lockedColumns, setLockedColumns] = React.useState(['unit']);
  const dataGridApiRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useImperativeHandle(ref, () => ({
    api: dataGridApiRef.current,
  }));

  const toggleColumnLock = (field) => {
    setLockedColumns((prev) =>
      prev.includes(field) ? prev.filter((col) => col !== field) : [...prev, field]
    );
  };

  const columnGroups = years.map((year) => ({
    groupId: year.toString(),
    headerName: year.toString(),
    headerClassName: 'yearly-header-group',
    renderHeaderGroup: ({ headerName }) => <Box className="group-header">{headerName}</Box>,
    children: quarters.map((quarter) => ({
      field: `${year}-${quarter.replace(' ', '')}`,
      headerName: quarter,
      width: isSmallScreen ? 80 : 100,
    })),
  }));

  const quarterColumns = [
    {
      field: 'pointer',
      headerName: 'Wskaźnik',
      width: isSmallScreen ? 200 : 300,
      pinned: false,
      headerClassName: 'quarterly-header',
      className: 'pointer-header',
      cellClassName: 'quarterly-cell',
      renderCell: (params) => <CustomCell {...params} />,
    },
    {
      field: 'unit',
      headerName: 'Jednostka',
      width: isSmallScreen ? 80 : 120,
      pinned: lockedColumns.includes('unit') ? 'left' : false,
      headerClassName: 'quarterly-header',
      cellClassName: 'quarterly-cell',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <div>Jednostka</div>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleColumnLock('unit');
            }}
            sx={{ ml: 0.5 }}
          >
            {lockedColumns.includes('unit') ? (
              <AnnotationTooltip title="Odepnij kolumnę" placement="bottom">
                <Link fontSize="small" />
              </AnnotationTooltip>
            ) : (
              <AnnotationTooltip title="Przypnij kolumnę" placement="bottom">
                <LinkOff fontSize="small" />
              </AnnotationTooltip>
            )}
          </IconButton>
        </Box>
      ),
    },
    ...years.flatMap((year) =>
      quarters.map((quarter) => ({
        field: `${year}-${quarter.replace(' ', '')}`,
        headerName: quarter,
        width: isSmallScreen ? 80 : 100,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'quarterly-header quarter-header',
        cellClassName: 'quarterly-cell',
      }))
    ),
  ];

  const pinnedColumns = {
    left: ['pointer', ...lockedColumns],
  };

  return (
    <Box className="quarterly-data-grid">
      <DataGrid
        rows={quarterRows}
        columns={quarterColumns}
        columnGroupingModel={columnGroups}
        pinnedColumns={pinnedColumns}
        experimentalFeatures={{ columnGrouping: true }}
        disableColumnResize
        disableColumnMenu
        disableColumnSorting
        disableRowSelectionOnClick
        hideFooter
        density="compact"
        //to do pagination
      />
    </Box>
  );
});

export default QuarterlyDataGrid;
