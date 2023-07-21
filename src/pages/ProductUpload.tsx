import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone'; 
import './ProductUpload.css';

interface PreviewFile extends File {
  preview: string;
}

function ProductUpload() {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop: DropzoneOptions['onDrop'] = acceptedFiles => {
    setFiles(acceptedFiles.map((file: FileWithPath) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }) as PreviewFile));
  }
 // @ts-ignore
  const { getRootProps, getInputProps } = useDropzone({ accept: ['image/jpeg', 'image/png'], onDrop });

  const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => setProductName(e.target.value);
  const handleProductTypeChange = (e: ChangeEvent<HTMLInputElement>) => setProductType(e.target.value);
  const handleProductStockChange = (e: ChangeEvent<HTMLInputElement>) => setProductStock(e.target.value);
  const handleProductDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setProductDescription(e.target.value);
  const handleProductPriceChange = (e: ChangeEvent<HTMLInputElement>) => setProductPrice(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('type', productType);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('stock', productStock);
    if (files.length > 0) {
      formData.append('file', files[0]); // just select the first file
    }
  
    try {
      const response = await fetch('https://production-management-a2a43e9e1fb5.herokuapp.com/api/products', {
        method: 'POST',
        body: formData, 
      });
      if (response.ok) {
        alert('Product added');
        setProductName('');
        setProductType('');
        setProductDescription('');
        setProductPrice('');
        setProductStock('');
        setFiles([]);
      } else {
        alert('Server error');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };
  

  const thumbs = files.map((file: PreviewFile) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{width: '200px', height: '200px'}} alt="preview" />
      </div>
    </div>
  ));

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <label>
          Product Type:
          <input type="text" value={productType} onChange={handleProductTypeChange} />
        </label>
        <label>
          Product Stock:
          <input type="number" value={productStock} onChange={handleProductStockChange} />
        </label>
        <label>
          Product Description:
          <input type="text" value={productDescription} onChange={handleProductDescriptionChange} />
        </label>
        <label>
          Product Price:
          <input type="number" value={productPrice} onChange={handleProductPriceChange} />
        </label>
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps({ name: 'file' })} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
        {thumbs}
        </aside>
        <input type="submit" value="Upload Product" />
      </form>
    </div>
  );
}

export default ProductUpload;


