import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../../constants/UploadIcon';
import styles from './NewProductForm.module.css';
import Switch from '@mui/material/Switch';

const NewProductForm = () => {
  const [checked, setChecked] = useState(false);
  const [files, setFiles] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 100000,
    accept: 'image/jpeg,image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  console.log(files);

  const cancelImage = () => {
    setFiles([]);
  };

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className={styles.fileImage}
          src={file.preview}
          style={{ width: '12rem' }}
          alt='file preview'
        />
      </div>
    </div>
  ));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <section className={styles.newProductFormContainer}>
      <div className={styles.newProductForm}>
        <h1 className={styles.heading}>Ürün Detayları</h1>
        <form id='form' className={styles.form}>
          <label htmlFor='name'>Ürün Adı</label>
          <input
            required
            placeholder='Örnek: Iphone 12 Pro Max'
            id='name'
            type='text'
          />
          <br />
          <label htmlFor='description'>Açıklama</label>
          <textarea
            required
            placeholder='Ürün açıklaması girin'
            className={styles.descriptionInput}
            id='description'
            type='text'
          />
          <br />
          <div className={styles.selectContainer}>
            <div>
              <label htmlFor='category'>Kategori</label>
              <select required>
                <option
                  className={styles.optionPlaceholder}
                  value=''
                  disabled
                  selected
                  hidden
                >
                  Kategori seç
                </option>
                <option value='' key=''></option>
              </select>
            </div>
            <div>
              <label htmlFor='brand'>Marka</label>
              <select required>
                <option value='' disabled selected hidden>
                  Marka seç
                </option>
                <option value='' key=''></option>
              </select>
            </div>
          </div>
          <div className={styles.selectContainer}>
            <div>
              <label htmlFor='color'>Renk</label>
              <select required>
                <option value='' disabled selected hidden>
                  Renk seç
                </option>
                <option value='' key=''></option>
              </select>
            </div>
            <div>
              <label htmlFor='status'>Kullanım Durumu</label>
              <select required>
                <option value='' disabled selected hidden>
                  Kullanım durumu seç
                </option>
                <option value='' key=''></option>
              </select>
            </div>
          </div>
          <label htmlFor='price'>Fiyat</label>

          <div className={styles.priceInputcontainer}>
            <input
              required
              placeholder='Bir fiyat girin'
              className={styles.priceInput}
              id='price'
              type='number'
            />
            <span className={styles.tlText}>TL</span>
          </div>

          <div className={styles.offerContainer}>
            <p>Teklif opsiyonu</p>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </form>
      </div>
      <div className={styles.fileUploadContainer}>
        <h1 className={styles.heading}>Ürün Görseli</h1>
        {!images.length > 0 && (
          <div {...getRootProps()} className={styles.uploadSpace}>
            <input {...getInputProps()} />
            <UploadIcon />
            <p className={styles.dragAndDropText}>Sürükleyip bırakarak yükle</p>
            <p className={styles.orText}>veya</p>
            <button className={styles.uploadButton}>Görsel Seçin</button>
            <p className={styles.fileValidationText}>
              PNG ve JPEG dosya boyutu: max 100kb
            </p>
          </div>
        )}
        {images.length > 0 && (
          <div className={styles.imageContainer}>
            {images}
            <svg
              onClick={cancelImage}
              className={styles.cancelImage}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        )}
        <button form='form' type='submit' className={styles.submitButton}>
          Kaydet
        </button>
      </div>
    </section>
  );
};

export default NewProductForm;
