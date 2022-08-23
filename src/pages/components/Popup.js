import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const modal = {
  display: 'grid',
  width: '100%',
  height: '100%',
  placeItems: 'center',
  fontWeight: 'bold',
};

const inputStyled = {
  width: '100%',
  borderRadius: '5px',
  outline: 'none',
  border: '1px solid #a8a8a8',
  padding: '0.75rem',
  marginBlock: '0.5rem',
};

const popupBox = {
  minWidth: '30rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '2rem',
  paddingTop: '0.75rem',
  borderRadius: '1rem',
};

const styledTextArea = {
  width: '100%',
  height: '8rem',
  borderRadius: '0.31rem',
  border: '1px solid #a8a8a8',
  resize: 'none',
  marginTop: '1rem',
  outline: 'none',
  paddingInline: '0.75rem',
  paddingBlock: '0.5rem',
};

// TODO: Feed others also in data
export default function Popup({ open, handleClose, data }) {
  const { title, text, input, textArea, handleConfirm, inputValue, errorMsg } =
    data;
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <Modal sx={modal} open={open} onClose={handleClose}>
      <Box sx={{ ...popupBox }}>
        <div
          style={{ textAlign: 'right', cursor: 'pointer' }}
          onClick={handleClose}
        >
          <CloseIcon />
        </div>
        <h3
          style={{ textAlign: 'center', marginBottom: '2rem' }}
          id='parent-modal-title'
        >
          {title}
        </h3>
        <p style={{ margin: '0', fontWeight: '400' }}>{text}</p>
        {input && (
          <input
            autoFocus
            required
            style={inputStyled}
            type='text'
            placeholder={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {textArea && (
          <textarea
            autoFocus
            style={styledTextArea}
            placeholder={textArea}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        )}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            style={{
              backgroundColor: '#7B931B',
              borderRadius: '0.5rem',
              color: 'white',
              paddingBlock: '0.5rem',
              paddingInline: '1rem',
              width: '49%',
              fontWeight: 'bold',
            }}
            onClick={() => {
              if (!value && (input || textArea)) {
                window.alert(errorMsg || 'Enter a valid name!');
                return;
              }
              handleConfirm(value);
              setValue('');
              handleClose();
            }}
          >
            Confirm
          </button>
          <button
            style={{
              border: '1.5px solid #7B931B',
              borderRadius: '0.5rem',
              color: '#7B931B',
              background: 'white',
              paddingBlock: '0.5rem',
              paddingInline: '1rem',
              width: '49%',
              fontWeight: 'bold',
            }}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
}
