import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';
import { login } from '../api/authApi';
import { toast } from 'react-toastify';

// Mock the API and external libraries
vi.mock('../api/authApi', () => ({
    login: vi.fn()
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

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('submits the form and navigates on successful login', async () => {
        login.mockResolvedValueOnce({
            data: { message: 'Success', token: 'fake-token', name: 'TestUser' }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'test@test.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
            expect(toast.success).toHaveBeenCalledWith('Success');
            expect(mockNavigate).toHaveBeenCalledWith('/home');
            expect(localStorage.getItem('token')).toBe('fake-token');
            expect(localStorage.getItem('username')).toBe('TestUser');
        });
    });

    it('shows error toast on login failure', async () => {
        login.mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
        });
    });
});
