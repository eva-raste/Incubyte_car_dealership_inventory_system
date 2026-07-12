import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
    beforeEach(() => {
        // Mock localStorage
        Storage.prototype.getItem = vi.fn((key) => {
            if (key === 'username') return 'TestUser';
            return null;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the welcome message with the username', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // Verify the heading is displayed with the mocked username
        expect(screen.getByText('Hello, TestUser!')).toBeInTheDocument();
        expect(screen.getByText('Welcome to the home page.')).toBeInTheDocument();
    });
});
