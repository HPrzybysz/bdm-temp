export const dataStructure = {
  pointers: [
    'Deficyt/nadwyżka i dług sektora instytucji rządowych i samorządowych',
    'Wydatki na zakupy i zamówienia',
    'PKB krajów radzieckich w latach 2014-2020',
    'Liczba zamówień w ramach projektów budżetu',
    'Przewóz osób w wieku 18-29 lat',
    'Przewóz osób w wieku 30-44 lat',
    'Przewóz osób w wieku 45-64 lat',
    'Przewóz osób w wieku 65-74 lat',
    'Przewóz osób w wieku 75-84 lat',
    'Przewóz osób w wieku 85-94 lat',
    'Przewóz osób w wieku 95-104 lat',
    'Ceny biletów MPK Poznań',
    'Ilośc betonu na ulicach Poznania',
  ],

  years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],

  quarters: ['1 kw.', '2 kw.', '3 kw.', '4 kw.'],

  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

  units: 'mln zł',

  annotations: [
    {
      pointerIndex: 0,
      annotation: 'a',
      annotationText: 'Bilans płatniczy jest statystycznym zestawieniem obrotów z zagranicą...',
    },
    {
      pointerIndex: 4,
      annotation: 'b',
      annotationText: 'Bilans płatniczy jest statystycznym zestawieniem obrotów',
    },
    {
      pointerIndex: 6,
      annotation: 'c',
      annotationText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
  ],

  getYearlyData: function () {
    return this.pointers.map((pointer, index) => {
      const hasAnnotation = this.annotations.some((a) => a.pointerIndex === index);
      const annotationData = this.annotations.find((a) => a.pointerIndex === index);

      const row = {
        id: index,
        pointer: pointer,
        unit: this.units,
        hasAnnotation: hasAnnotation,
        annotation: hasAnnotation ? annotationData.annotation : '',
        annotationText: hasAnnotation ? annotationData.annotationText : '',
      };

      this.years.forEach((year) => {
        row[year] = Math.floor(Math.random() * 10000) - 5000;
      });

      return row;
    });
  },

  getQuarterlyData: function () {
    return this.pointers.map((pointer, index) => {
      const hasAnnotation = this.annotations.some((a) => a.pointerIndex === index);
      const annotationData = this.annotations.find((a) => a.pointerIndex === index);

      const rowData = {
        id: index,
        pointer: pointer,
        unit: this.units,
        hasAnnotation: hasAnnotation,
        annotation: hasAnnotation ? annotationData.annotation : '',
        annotationText: hasAnnotation ? annotationData.annotationText : '',
      };

      this.years.forEach((year) => {
        this.quarters.forEach((quarter) => {
          rowData[`${year}-${quarter.replace(' ', '')}`] = Math.floor(Math.random() * 10000) - 5000;
        });
      });

      return rowData;
    });
  },

  getMonthlyData: function () {
    return this.pointers.map((pointer, index) => {
      const hasAnnotation = this.annotations.some((a) => a.pointerIndex === index);
      const annotationData = this.annotations.find((a) => a.pointerIndex === index);

      const rowData = {
        id: index,
        pointer: pointer,
        unit: this.units,
        hasAnnotation: hasAnnotation,
        annotation: hasAnnotation ? annotationData.annotation : '',
        annotationText: hasAnnotation ? annotationData.annotationText : '',
      };

      this.years.forEach((year) => {
        this.months.forEach((month) => {
          rowData[`${year}-${month}`] = Math.floor(Math.random() * 10000) - 5000;
        });
      });

      return rowData;
    });
  },
};

export const pointers = dataStructure.pointers;
export const yearValues = dataStructure.years.map(() => Math.floor(Math.random() * 10000) - 5000);
export const pointersWithAnnotations = dataStructure.annotations.map((a) => a.pointerIndex);
export const annotationTexts = dataStructure.annotations.map((a) => a.annotationText);

export default dataStructure;
