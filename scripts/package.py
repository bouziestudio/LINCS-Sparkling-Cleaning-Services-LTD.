import os
import zipfile

def package_website():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, 'public')
    os.makedirs(public_dir, exist_ok=True)

    # 1. Package source code
    src_zip_path = os.path.join(public_dir, 'lincs-cleaning-website.zip')
    exclude_dirs = {'node_modules', '.git', 'dist', '__pycache__', '.vite', '.vercel', '.output'}
    exclude_files = {'.DS_Store', 'lincs-cleaning-website.zip', 'lincs-cleaning-website-dist.zip', 'package.py'}

    with zipfile.ZipFile(src_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(base_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                if file in exclude_files or file.endswith('.zip') or file.endswith('.pyc'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                zipf.write(full_path, arcname=os.path.join('lincs-cleaning-website', rel_path))

    print(f"✓ Created Source Code Archive: {src_zip_path} ({os.path.getsize(src_zip_path)} bytes)")

    # 2. Package dist build if exists
    dist_dir = os.path.join(base_dir, 'dist')
    if os.path.exists(dist_dir):
        dist_zip_path = os.path.join(public_dir, 'lincs-cleaning-website-dist.zip')
        with zipfile.ZipFile(dist_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(dist_dir):
                for file in files:
                    if file.endswith('.zip'):
                        continue
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, dist_dir)
                    zipf.write(full_path, arcname=rel_path)
        print(f"✓ Created Static Build Archive: {dist_zip_path} ({os.path.getsize(dist_zip_path)} bytes)")
        # Also ensure both zips exist inside dist so dist can self-host downloads
        import shutil
        shutil.copy2(src_zip_path, os.path.join(dist_dir, 'lincs-cleaning-website.zip'))
        shutil.copy2(dist_zip_path, os.path.join(dist_dir, 'lincs-cleaning-website-dist.zip'))

if __name__ == '__main__':
    package_website()
