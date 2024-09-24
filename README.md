# cloudlinux-documentation

## Install dependencies

```sh
$ yarn
```

## Run development server

```sh
$ yarn docs:dev
```

## Build static assets

```sh
$ yarn docs:build
```

## Adding Images

When adding new images to the documentation, follow these guidelines:

1. Image Location:
   - Place all images in the `docs/.vuepress/public/images/` directory.
   - Use subdirectories that match your documentation structure. Feel free to create new subdirectories as needed.
   - Avoid placing images directly in the `images` directory.

2. Image Format:
   - Use WebP format for all images. Convert other formats to WebP before adding.

3. Referencing Images in Markdown:
   - Use relative paths from the root of the public directory.
   - The path structure should mirror your documentation structure.


### Example: Adding an image to the Solo CloudLinux User Docs

Let's say you want to add an image to `End-user Documents > Cloudlinux Solo for end-users`.

1. Convert your image to WebP format and give it a meaningful name, for example `solo-cloudlinux-dashboard.webp`.
    - The filename should be all lowercase and use hyphens to separate words. no spaces or special characters.
    - Use a descriptive name that reflects the image content.
    - No more than 5 words in the filename.

2. Place the image in the following directory:
    ```
    docs/.vuepress/public/images/user-docs/user-docs-solo-cloudlinux
    ```
3. Reference the image in your markdown file:
    ```
    ![Solo CloudLinux Dashboard](/images/user-docs/user-docs-solo-cloudlinux/solo-cloudlinux-dashboard.webp)
    ```