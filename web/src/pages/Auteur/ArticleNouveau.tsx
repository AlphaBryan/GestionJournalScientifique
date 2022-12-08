import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {Box, Button, Checkbox, Chip, ListItemText, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCategories} from "../../redux/features/category/category-slice";
import {getAuthors} from "../../redux/features/author/author-slice";
import {Author} from "../../redux/dto/Author";
import {addArticle} from "../../redux/features/article/article-slice";

const ArticleNouveau = () => {

    const dispatch = useAppDispatch();

    const categories = useAppSelector(state => state.category.categories);
    const authors = useAppSelector(state => state.author.authors);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [categoriesId, setCategoriesId] = useState<string[]>([]);
    const [authorsId, setAuthorsId] = useState<string[]>([]);

    const computeAuthorLabel = useCallback((author: Author) => {
        return `${author.firstName} ${author.lastName} - ${author.id}`;
    }, []);

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        dispatch(addArticle({title, text, categoriesId, authorsId}));

        // TODO redirect to created article
    }, [title, text, categoriesId, authorsId]);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAuthors());
    }, [dispatch]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 style={{marginTop: "5%"}}> Nouveau article </h1>
                </div>
                <div style={{marginTop: "5%"}}>
                    <TextField
                        id="standard-basic"
                        label="Nom de l'article"
                        variant="standard"
                        sx={{width: "90%", marginLeft: "5%", marginBottom: "3%"}}
                        value={title}
                        onChange={(event) => setTitle(event.currentTarget.value)}
                    />
                    <div
                        style={{
                            background: "black",
                            height: "3px",
                            width: "75%",
                            margin: "auto",
                            marginTop: "3%",
                            marginBottom: "5%",
                        }}
                    />
                    <h2> Catégories </h2>
                    <Select
                        labelId="categories-label"
                        id="categories"
                        multiple
                        value={categoriesId}
                        onChange={(event) => {
                            const {target: {value}} = event;
                            setCategoriesId(typeof value === 'string' ? value.split(',') : value);
                        }}
                        style={{width: 250}}
                        input={<OutlinedInput label="" placeholder=""/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value}
                                          label={categories.find(c => c.id.toString() === value)?.label}/>
                                ))}
                            </Box>
                        )}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                <Checkbox checked={categoriesId.indexOf(category.id.toString()) > -1}/>
                                <ListItemText primary={category.label}/></MenuItem>
                        ))}
                    </Select>
                    <div
                        style={{
                            background: "black",
                            height: "3px",
                            width: "75%",
                            margin: "auto",
                            marginTop: "3%",
                            marginBottom: "5%",
                        }}
                    />
                    <h2> Auteurs </h2>
                    <Select
                        labelId="authors-label"
                        id="authors"
                        multiple
                        value={authorsId}
                        onChange={(event) => {
                            const {target: {value}} = event;
                            setAuthorsId(typeof value === 'string' ? value.split(',') : value);
                        }}
                        style={{width: 250}}
                        input={<OutlinedInput label="" placeholder=""/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value}
                                          label={computeAuthorLabel(authors.find(a => a.id.toString() === value) as Author)}/>
                                ))}
                            </Box>
                        )}
                    >
                        {authors.map((author) => (
                            <MenuItem
                                key={author.id}
                                value={author.id.toString()}
                            >
                                <Checkbox checked={authorsId.indexOf(author.id.toString()) > -1}/>
                                <ListItemText primary={computeAuthorLabel(author)}/></MenuItem>
                        ))}
                    </Select>
                    <div
                        style={{
                            background: "black",
                            height: "3px",
                            width: "75%",
                            margin: "auto",
                            marginTop: "3%",
                            marginBottom: "5%",
                        }}
                    />
                    <div>
                        <h2> Fichers </h2>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Multiline"
                            multiline
                            maxRows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="filled"
                            sx={{width: "90%", marginLeft: "5%", marginBottom: "3%"}}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{
                            width: "70%",
                            marginLeft: "15%",
                            marginTop: "5%",
                            marginBottom: "5%",
                            backgroundColor: "#72bcd4",
                        }}
                    >
                        Enregistrer l'article
                    </Button>
                </div>
            </form>
        </div>
    );
};

// articleNouveau in index cont variable
const index = () => {
    return (
        <div>
            <ArticleNouveau/>
        </div>
    );
};

export default index;
