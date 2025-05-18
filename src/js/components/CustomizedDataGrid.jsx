// CustomizedDataGrid.jsx
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, useTheme } from '@mui/material';
import { Link, LinkOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { AnnotationTooltip } from './CustomTooltips';
import axios from 'axios';
import '../../scss/CustomizedDataGrid.scss';

const CustomCell = ({ row }) => {
  const { pointer, hasAnnotation, annotation, annotationText } = row;
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
    >
      <span>{pointer}</span>
      {hasAnnotation && (
        <AnnotationTooltip
          title={<Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>{annotationText}</Box>}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#B5D334',
              color: '#131523',
              marginLeft: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {annotation}
          </Box>
        </AnnotationTooltip>
      )}
    </Box>
  );
};

const CustomizedDataGrid = forwardRef(({ tableId = 1 }, ref) => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lockedColumns, setLockedColumns] = useState(['pointer', 'unit']);
  const dataGridRef = useRef(null);
  const containerRef = useRef(null);
  const scrollableContentRef = useRef(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/app/wskazniki?lang=PL&tablicaId=${tableId}`);
        processData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIndicators();
  }, [tableId]);

  const processData = (data) => {
    const years = new Set();
    data.forEach((p) =>
      p.wskazniki?.forEach((w) =>
        w.wartosci?.forEach((v) => years.add(Math.floor(v.id_czas / 1000000)))
      )
    );
    const sortedYears = Array.from(years).sort();

    const baseColumns = [
      { field: 'pointer', headerName: 'Wskaźnik', width: 300 },
      { field: 'unit', headerName: 'Jednostka', width: 120 },
    ];
    const yearColumns = sortedYears.map((year) => ({
      field: year.toString(),
      headerName: year.toString(),
      width: 100,
      headerAlign: 'center',
      align: 'center',
    }));

    setColumns([...baseColumns, ...yearColumns]);

    const newRows = [];
    data.forEach((p) =>
      p.wskazniki?.forEach((w, i) => {
        const row = {
          id: `${p.id_poziomy}-${i}`,
          pointer: w.id_zbiorcza ? `${p.wskaznik}` : p.wskaznik,
          unit: w.id_miara || 'mln EUR',
        };
        sortedYears.forEach((year) => {
          const val = w.wartosci?.find((v) => Math.floor(v.id_czas / 1000000) === year);
          row[year] = val ? val.wartosc : '-';
        });
        newRows.push(row);
      })
    );
    setRows(newRows);
  };

  const toggleColumnLock = (field) => {
    setLockedColumns((prev) =>
      prev.includes(field) ? prev.filter((col) => col !== field) : [...prev, field]
    );
  };

  const modifiedColumns = columns.map((col) => {
    if (col.field === 'pointer') {
      return { ...col, renderCell: (params) => <CustomCell row={params.row} />, width: 300 };
    }
    if (col.field === 'unit') {
      return {
        ...col,
        width: 120,
        renderHeader: () => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span>Jednostka</span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleColumnLock(col.field);
              }}
            >
              {lockedColumns.includes(col.field) ? (
                <AnnotationTooltip title="Odblokuj kolumnę">
                  <Link fontSize="small" />
                </AnnotationTooltip>
              ) : (
                <AnnotationTooltip title="Zablokuj kolumnę">
                  <LinkOff fontSize="small" />
                </AnnotationTooltip>
              )}
            </IconButton>
          </Box>
        ),
      };
    }
    return { ...col };
  });

  useEffect(() => {
    const scrollable = scrollableContentRef.current;
    const container = containerRef.current;
    const pinnedCols = container.querySelectorAll('.pinned-column-content');

    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      pinnedCols.forEach((col) => (col.scrollTop = scrollTop));
      if (e.target === scrollable) container.scrollLeft = e.target.scrollLeft;
      else scrollable.scrollLeft = e.target.scrollLeft;
    };

    scrollable?.addEventListener('scroll', handleScroll);
    container?.addEventListener('scroll', handleScroll);
    return () => {
      scrollable?.removeEventListener('scroll', handleScroll);
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useImperativeHandle(ref, () => ({ api: dataGridRef.current }));

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: 600,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F5F6FA',
      }}
    >
      {loading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ color: 'error.main', p: 2 }}>Error loading data</Box>
      ) : (
        <>
          {/* Pinned columns */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              backgroundColor: '#F5F6FA',
              boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
            }}
          >
            {/* Pointer Column */}
            <Box
              sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #e0e0e0',
              }}
            >
              <Box
                sx={{
                  height: 'var(--DataGrid-headerHeight)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  backgroundColor: '#E6E9F4',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                Wskaźnik
              </Box>
              <Box className="pinned-column-content" sx={{
                overflowY: 'visible', // or just remove
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                width: 300,
                backgroundColor: '#F5F6FA',
                borderRight: '1px solid #e0e0e0',
              }}>
                {rows.map((row) => (
                  <Box
                    key={row.id}
                    sx={{
                      height: 'var(--DataGrid-rowHeight)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 16px',
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    <CustomCell row={row} />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Unit Column */}
            {lockedColumns.includes('unit') && (
              <Box
                sx={{
                  width: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: '1px solid #e0e0e0',
                }}
              >
                <Box
                  sx={{
                    height: 'var(--DataGrid-headerHeight)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    backgroundColor: '#E6E9F4',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span>Jednostka</span>
                    <IconButton
                      size="small"
                      onClick={() => toggleColumnLock('unit')}
                      sx={{ ml: 0.5 }}
                    >
                      {lockedColumns.includes('unit') ? (
                        <Link fontSize="small" />
                      ) : (
                        <LinkOff fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Box className="pinned-column-content" sx={{
                  overflowY: 'visible', // or just remove
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  width: 300,
                  backgroundColor: '#F5F6FA',
                  borderRight: '1px solid #e0e0e0',
                }}>
                  {rows.map((row) => (
                    <Box
                      key={row.id}
                      sx={{
                        height: 'var(--DataGrid-rowHeight)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 8px',
                        borderBottom: '1px solid #e0e0e0',
                      }}
                    >
                      {row.unit}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Scrollable DataGrid */}
          <Box
            ref={scrollableContentRef}
            sx={{
              position: 'absolute',
              left: lockedColumns.includes('unit') ? 420 : 300,
              right: 0,
              top: 0,
              bottom: 0,
              overflow: 'auto',
              borderLeft: '1px solid #e0e0e0',
            }}
          >
            <DataGrid
              ref={dataGridRef}
              rows={rows}
              columns={modifiedColumns.filter((col) => !lockedColumns.includes(col.field))}
              disableColumnResize
              disableColumnMenu
              disableColumnSorting
              disableRowSelectionOnClick
              hideFooter
              density="compact"
              sx={{
                width: 'fit-content',
                minWidth: '100%',
                '& .MuiDataGrid-columnHeaders': {
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  backgroundColor: '#E6E9F4',
                },
                '& .MuiDataGrid-cell': {
                  borderRight: '1px solid #e0e0e0',
                },
                '& .MuiDataGrid-row': {
                  height: 'var(--DataGrid-rowHeight)',
                  maxHeight: 'var(--DataGrid-rowHeight)',
                  '& .MuiDataGrid-cell': {
                    height: 'var(--DataGrid-rowHeight)',
                    maxHeight: 'var(--DataGrid-rowHeight)',
                    padding: '0 8px !important',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
});

export default CustomizedDataGrid;
