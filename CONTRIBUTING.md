# Contributing to Sistem Penilaian Mahasiswa

Terima kasih atas minat Anda untuk berkontribusi!

## Development Setup

1. Fork repository ini
2. Clone fork Anda:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sistem-penilaian-mahasiswa.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Buat branch baru:
   ```bash
   git checkout -b feature/nama-fitur
   ```

## Running Tests

Sebelum submit PR, pastikan semua test passing:

```bash
npm test
```

## Code Style

- Gunakan 2 spaces untuk indentasi
- Gunakan semicolons
- Tulis test untuk setiap fitur baru
- Pastikan coverage tidak turun

## Pull Request Process

1. Update README.md jika ada perubahan API
2. Pastikan semua test passing
3. Pastikan coverage ≥ 60%
4. Update CHANGELOG.md
5. Request review dari maintainer

## Commit Message Guidelines

Format: `type(scope): subject`

Types:
- feat: Fitur baru
- fix: Bug fix
- docs: Dokumentasi
- test: Menambah test
- refactor: Refactoring code

Contoh:
```
feat(api): add endpoint to get students by major
fix(validation): fix NIM validation regex
docs(readme): update API documentation
```
