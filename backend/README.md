# PR Digital CMS Backend

A comprehensive backend system for managing music releases, artists, labels, and digital distribution.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Manager, Artist)
  - Secure password hashing

- **Music Release Management**
  - Complete CRUD operations for releases
  - UPC code management
  - Release status workflow (Pending → Approved → Delivered/Takedown)
  - Cover art and audio file uploads

- **Artist & Label Management**
  - Artist profiles with bio and contact information
  - Label management with contact details
  - Social media links support

- **File Upload System**
  - Secure file uploads with validation
  - Support for audio files and cover art
  - File size and type restrictions

- **API Security**
  - Rate limiting
  - CORS protection
  - Helmet security headers
  - Input validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT
- **File Uploads**: Multer
- **Security**: Helmet, CORS, Rate Limiting

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pr-digital-cms-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the migration file in the Supabase SQL editor
   - The migration will create all necessary tables and policies

5. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Releases
- `GET /api/releases` - Get all releases (with pagination)
- `GET /api/releases/:id` - Get single release
- `POST /api/releases` - Create new release
- `PUT /api/releases/:id` - Update release
- `DELETE /api/releases/:id` - Delete release
- `PATCH /api/releases/:id/status` - Update release status

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get single artist
- `POST /api/artists` - Create new artist
- `PUT /api/artists/:id` - Update artist
- `DELETE /api/artists/:id` - Delete artist

### Labels
- `GET /api/labels` - Get all labels
- `GET /api/labels/:id` - Get single label
- `POST /api/labels` - Create new label
- `PUT /api/labels/:id` - Update label
- `DELETE /api/labels/:id` - Delete label

### File Uploads
- `POST /api/uploads/single` - Upload single file
- `POST /api/uploads/multiple` - Upload multiple files
- `GET /api/uploads/my-uploads` - Get user's uploads
- `DELETE /api/uploads/:id` - Delete upload

### User Management (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `PATCH /api/users/:id/password` - Change user password
- `PATCH /api/users/:id/deactivate` - Deactivate user
- `DELETE /api/users/:id` - Delete user

## Database Schema

### Users
- User authentication and role management
- Roles: admin, manager, artist

### Artists
- Artist profiles with contact information
- Social media links support

### Labels
- Record label information
- Contact details and website

### Releases
- Music release metadata
- UPC codes and status tracking
- File URLs for cover art and audio

### Uploads
- File upload tracking
- User ownership and metadata

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for different user roles
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all user inputs
- **File Upload Security**: Validates file types and sizes
- **CORS Protection**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers

## Default Admin Account

- **Username**: admin
- **Email**: admin@prdigitalcms.com
- **Password**: admin123

**Important**: Change the default admin password after first login!

## File Upload Configuration

- **Max File Size**: 50MB (configurable)
- **Supported Audio Formats**: MP3, WAV, FLAC, etc.
- **Supported Image Formats**: JPG, PNG, GIF, etc.
- **Upload Directory**: `uploads/` (with subfolders for different file types)

## Environment Variables

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload Configuration
MAX_FILE_SIZE=50000000
UPLOAD_PATH=uploads/
```

## Development

1. **Start in development mode**
   ```bash
   npm run dev
   ```

2. **Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```

## Deployment

1. **Production Environment Variables**
   - Set `NODE_ENV=production`
   - Update CORS origins for your frontend domain
   - Use strong JWT secret

2. **Database Migration**
   - Run the migration script in your production Supabase instance
   - Ensure all environment variables are set

3. **File Storage**
   - For production, consider using cloud storage (AWS S3, Google Cloud Storage)
   - Update file upload configuration accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.