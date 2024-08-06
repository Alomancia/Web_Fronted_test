// src/QueryComponent.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const QueryComponent = () => {
  const [idProducto, setIdProducto] = useState('');
  const [nombreProducto, setNombreProducto] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const product = jsonData.find((item) => String(item.ID_PRODUCTO) === idProducto);
      if (product) {
        setNombreProducto(product.NOMBRE_PRODUCTO);
      } else {
        setNombreProducto('Product not found');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (event) => {
    setIdProducto(event.target.value);
  };

  return (
    <div>
      <h1>Product Query</h1>
      <input
        type="text"
        placeholder="Enter ID_PRODUCTO"
        value={idProducto}
        onChange={handleInputChange}
      />
      <input type="file" onChange={handleFileUpload} />
      <p>{nombreProducto}</p>
    </div>
  );
};

export default QueryComponent;