import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'
import { getBreeds } from './utils/api';
import AddButton from './components/common/buttons/add-button';
import RequestButton from './components/common/buttons/request-button';

describe('ui tests', () => {
  test('find title', async () => {
    render(<App />);
  
    await waitFor(() => {
      const titleElement = screen.getByText(/Dog generator/i);
      expect(titleElement).toBeInTheDocument();
    });
  });
  
  test('find generate image button', async () => {
    render(<App />);
  
    await waitFor(() => {
      const buttonElement = screen.getByText(/Generate images/i);
      expect(buttonElement).toBeInTheDocument();
    });
  });
  
  test('add new item button', async () => {
    render(<App />);
  
    await waitFor(() => {
      const addNewFieldButton = screen.getByTestId('add-button');
      expect(addNewFieldButton).toBeInTheDocument();
    });
  });
});

describe('api tests', () => {
  test('get breeds data from server', async () => {
    return await getBreeds('breeds/list/all').then(data => {
      expect(data.status).toBe('success');
    });
  });
  
  test('get dogs by breeds', async () => {
    const breeds = { firstBreed: 'chow', secondBreed: 'affenpinscher', thirdBreed: 'coonhound' }
    await getBreeds(`breed/${breeds.firstBreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
    await getBreeds(`breed/${breeds.secondBreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
    await getBreeds(`breed/${breeds.thirdBreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
  });
  
  test('get dogs by breed/subbreed', async () => {
    const breeds = { firstBreed: 'bulldog', secondBreed: 'terrier', thirdBreed: 'retriever' }
    const subbreeds = { firstSubbreed: 'boston', secondSubbreed: 'irish', thirdSubbreed: 'golden'}
    await getBreeds(`breed/${breeds.firstBreed}/${subbreeds.firstSubbreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
    await getBreeds(`breed/${breeds.secondBreed}/${subbreeds.secondSubbreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
    await getBreeds(`breed/${breeds.thirdBreed}/${subbreeds.thirdSubbreed}/images/random/1`).then(data => {
      expect(data.status).toBe('success');
    });
  });
});

describe('button tests', () => {
  test('is button disabled', async () => {
    render(<App />);
  
    const isDisabled = !!screen.getByTestId(/breed/i).getAttribute('value');
    const buttonElement = screen.getByTestId('open-modal-button');
  
    await waitFor(() => {
      expect(!!buttonElement.getAttribute('value')).toBe(isDisabled)
    });
  });

  test('add new field on click', async () => {
    const addNewField = jest.fn();
    render(<AddButton isLast={true} onClick={addNewField} />);
    
    const buttonElement = screen.getByTestId('add-button')
    fireEvent.click(buttonElement);
    expect(addNewField).toBeCalledTimes(1);
  });

  test('open images modal', async () => {
    const openModal = jest.fn();
    render(<RequestButton isDisabled={false} onClick={openModal} />);
    
    const buttonElement = screen.getByTestId('open-modal-button')
    fireEvent.click(buttonElement);
    expect(openModal).toBeCalledTimes(1);
  });
})
