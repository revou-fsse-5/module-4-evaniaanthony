import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Box,
    Alert,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Category {
    id: number;
    name: string;
    description: string;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState<Category>({
        id: 0,
        name: '',
        description: '',
    });
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data: Category[] = await response.json();
            setCategories(data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        setConfirmDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/categories/${categoryToDelete.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            setCategories(categories.filter((category) => category.id !== categoryToDelete.id));
            setConfirmDeleteOpen(false);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleEdit = (category: Category) => {
        setEditCategory(category);
        setNewCategory(category);
        setOpen(true);
    };

    const handleUpdate = async () => {
        if (!editCategory) return;

        try {
            const response = await fetch(`http://localhost:8080/categories/${editCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            setCategories(categories.map((category) =>
                category.id === editCategory.id ? newCategory : category
            ));
            setOpen(false);
            setNewCategory({ id: 0, name: '', description: '' });
            setEditCategory(null);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch('http://localhost:8080/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const addedCategory: Category = await response.json();
            setCategories([...categories, addedCategory]);
            setOpen(false);
            setNewCategory({ id: 0, name: '', description: '' });
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditCategory(null);
        setNewCategory({ id: 0, name: '', description: '' });
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box mt={5}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom align='center'>
                Categories
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box textAlign="right" mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setOpen(true)}
                    >
                        Add Category
                    </Button>
                </Box>
                <List>
                    {categories.map((category) => (
                        <ListItem key={category.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <ListItemText
                                primary={category.name}
                                secondary={category.description}
                            />
                            <Box>
                                <IconButton onClick={() => handleEdit(category)} color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(category)} color="error">
                                    <Delete />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={editCategory ? handleUpdate : handleAdd}
                        color="primary"
                    >
                        {editCategory ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this category?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Category;
