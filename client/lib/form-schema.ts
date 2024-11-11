import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const postSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE),
      `Each file must be less than 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  shortContent: z
    .string()
    .min(10, {
      message: 'Short content must be at least 10 characters.'
    })
    .max(500, {
      message: 'Short content must be at most 500 characters.'
    }),
  title: z
    .string()
    .min(10, {
      message: 'Title must be at least 10 characters.'
    })
    .max(100, {
      message: 'Title must be at most 100 characters.'
    }),
  fullContent: z.string().min(10, {
    message: 'Post content must be at least 10 characters.'
  })
});

export type PostFormValues = z.infer<typeof postSchema>;
