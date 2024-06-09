// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        ErrorBoundary._error = error;
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }
        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}

export default ErrorBoundary;
