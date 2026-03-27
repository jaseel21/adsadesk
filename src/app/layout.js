import './globals.css'

export const metadata = {
  title: 'Student Management System',
  description: 'Manage school students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}