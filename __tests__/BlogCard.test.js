import { render, screen } from '@testing-library/react';
import BlogCard from './BlogCard';

const mockBlog = {
  id: '1',
  title: 'Test Blog',
  content: 'This is a test blog content.',
  author: 'Test Author',
  createdAt: new Date(),
  readTime: 5,
  image: 'test-image.jpg',
  authorPhoto: 'author-photo.jpg',
};

describe('BlogCard', () => {
  it('renders blog title', () => {
    render(
      <BlogCard
        blog={mockBlog}
        liked={false}
        views={10}
        onLike={() => {}}
        onView={() => {}}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
  });
});