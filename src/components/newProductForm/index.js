import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loading/LoadingSpinner';
import UploadIcon from '../../constants/UploadIcon';
import styles from './NewProductForm.module.css';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import AlertIcon from '../../constants/AlertIcon';

const NewProductForm = () => {
  const [cookies] = useCookies(['token']);
  const [checked, setChecked] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const brandRef = useRef();
  const colorRef = useRef();
  const statusRef = useRef();
  const priceRef = useRef();

  const submitProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const selectedCategoryId = categories.findIndex(
      (category) => category.name === categoryRef.current.value
    );

    const productData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: selectedCategoryId + 1,
      brand: brandRef.current.value,
      color: colorRef.current.value,
      status: statusRef.current.value,
      price: priceRef.current.value,
      isOfferable: checked,
      isSold: false,
      users_permissions_user: user.id,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(productData));
    formData.append('files.image', files[0]);

    const response = await axios({
      method: 'POST',
      url: 'https://bootcamp.akbolat.net/products',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    if (response.status === 200) {
      setIsLoading(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        navigate('/');
      }, 3000);
    }
  };

  const getCategories = () => {
    axios.get('https://bootcamp.akbolat.net/categories').then((res) => {
      setCategories(res.data);
    });
  };

  const getBrands = () => {
    axios.get('https://bootcamp.akbolat.net/brands').then((res) => {
      setBrands(res.data);
    });
  };

  const getColors = () => {
    axios.get('https://bootcamp.akbolat.net/colors').then((res) => {
      setColors(res.data);
    });
  };

  const getStatuses = () => {
    axios.get('https://bootcamp.akbolat.net/using-statuses').then((res) => {
      setStatuses(res.data);
    });
  };

  useEffect(() => {
    getCategories();
    getBrands();
    getColors();
    getStatuses();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 100000,
    accept: 'image/jpeg,image/png',
    onDrop: (acceptedFiles, fileRejections) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      fileRejections.forEach((err) => {
        console.log(err.errors[0].code);
        if (
          err?.errors[0]?.code === 'file-too-large' ||
          err.code === 'file-invalid-type'
        ) {
          setError('Lütfen geçerli bir görsel seçiniz!');
        }
      });
    },
  });

  const cancelImage = () => {
    setFiles([]);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, [3000]);
    }
  }, [error]);

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
    <>
      {!isLoading && !done && (
        <section className={styles.newProductFormContainer}>
          <div className={styles.newProductForm}>
            <h1 className={styles.heading}>Ürün Detayları</h1>
            <form onSubmit={submitProduct} id='form' className={styles.form}>
              <label htmlFor='name'>Ürün Adı</label>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Örnek: Iphone 12 Pro Max'
                id='name'
                type='text'
              />
              <br />
              <label htmlFor='description'>Açıklama</label>
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                  <select ref={categoryRef} required>
                    <option
                      className={styles.optionPlaceholder}
                      value=''
                      disabled
                      selected
                      hidden
                    >
                      Kategori seç
                    </option>
                    {categories.map((category) => (
                      <option value={category.name} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor='brand'>Marka</label>
                  <select ref={brandRef} required>
                    <option value='' disabled selected hidden>
                      Marka seç
                    </option>
                    {brands.map((brand) => (
                      <option value={brand.name} key={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.selectContainer}>
                <div>
                  <label htmlFor='color'>Renk</label>
                  <select ref={colorRef} required>
                    <option value='' disabled selected hidden>
                      Renk seç
                    </option>
                    {colors.map((color) => (
                      <option value={color.name} key={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor='status'>Kullanım Durumu</label>
                  <select ref={statusRef} required>
                    <option value='' disabled selected hidden>
                      Kullanım durumu seç
                    </option>

                    {statuses.map((status) => (
                      <option value={status.name} key={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label htmlFor='price'>Fiyat</label>

              <div className={styles.priceInputcontainer}>
                <input
                  ref={priceRef}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder='Bir fiyat girin'
                  className={styles.priceInput}
                  id='price'
                  type='number'
                  onWheel={(event) => event.currentTarget.blur()}
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
                <p className={styles.dragAndDropText}>
                  Sürükleyip bırakarak yükle
                </p>
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
      )}

      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}

      {done && (
        <h1 className={styles.doneText}>
          Ürününüz başarıyla eklendi, anasayfaya yönlendiriliyorsunuz!
        </h1>
      )}

      {error && (
        <div className={styles.alert}>
          <AlertIcon />
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default NewProductForm;
