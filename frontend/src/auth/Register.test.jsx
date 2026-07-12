import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Register from './Register';
import { register } from '../api/authApi';
import { toast } from 'react-toastify';

// Mock the API and external libraries
vi.mock('../api/authApi', () => ({
    register: vi.fn()
}));

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('Register Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the registration form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('submits the form and navigates to login on successful registration', async () => {
        register.mockResolvedValueOnce({
            data: { message: 'Registration Successful' }
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Test User' }
        });
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@test.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith({ name: 'Test User', email: 'test@test.com', password: 'password123' });
            expect(toast.success).toHaveBeenCalledWith('Registration Successful');
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('shows error toast on registration failure', async () => {
        register.mockRejectedValueOnce({
            response: { data: { message: 'Email already exists' } }
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Email already exists');
        });
    });
});
