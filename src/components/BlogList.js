import React from 'react';

const BlogList = ({ blogs }) => {
    return (
        <div>
            <h2>Blog List</h2>
            <ul>
                {blogs.map((blog, index) => (
                    <li key={index}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
