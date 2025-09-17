'use client';

import { AuthProvider } from '../../components/AuthProvider';
import '../globals.css';

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="font-sans dashboard-full-layout">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}