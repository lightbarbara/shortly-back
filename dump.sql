--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email character varying(30) NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, '64501519-d8ee-4cf7-977e-56103330978d', 1);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'https://www.devmedia.com.br/funcao-coalesce-sql/23670', 'AoxPUaKjfEYMkk4NxgfAy', 2, '2022-12-22', 5);
INSERT INTO public.urls VALUES (2, 'https://www.youtube.com/watch?v=byJuRYQ7rJ8', 'XADlNQdfY3OC9zDJG8Nki', 2, '2022-12-22', 0);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'bianca', 'bianca@gmail.com', '$2b$15$vsBs/ktg.9cUMTb0tSs/3Ou0wAwJq3OPQGQ3KwTnsNgKRQ34R1NMi', '2022-12-22');
INSERT INTO public.users VALUES (2, 'barbara', 'barbara@gmail.com', '$2b$15$D02GZf3zX7mVrUlkxP/PuO3cDphy4hA8npOtmZzhZ.zLuiUt0cO7m', '2022-12-22');
INSERT INTO public.users VALUES (3, 'luiz', 'luiz@gmail.com', '$2b$15$SGmy.GNmidpE.d8zi4BqgeWVVh7S4BOoVykmWlDe67onRIJYkP55.', '2022-12-22');
INSERT INTO public.users VALUES (4, 'joao', 'joao@gmail.com', '$2b$15$dUQuEwAlr6vWS2ipJjIcue3htZbBW0bRUB0CCtElXdPLdMiF2C5Xy', '2022-12-22');
INSERT INTO public.users VALUES (5, 'amanda', 'amanda@gmail.com', '$2b$15$3pt0yBwSk7/.a6/prN1QOeXaMThvgsvTqa76B5bu7bi7Vy2OGN4km', '2022-12-22');
INSERT INTO public.users VALUES (6, 'thiago', 'thiago@gmail.com', '$2b$15$8BaK0ZHnYe9xrtb8etHQBOlLfuFcqxLc/lkRtgFYpgFxbtzodXc4K', '2022-12-22');
INSERT INTO public.users VALUES (7, 'pedro', 'pedro@gmail.com', '$2b$15$0/OHUu.HFPsFhxRH8YQfl.DN0OfSxwXo2JS/TLxC30D6He7UUnxVW', '2022-12-22');
INSERT INTO public.users VALUES (8, 'camila', 'camila@gmail.com', '$2b$15$l3F0CxkoFuFwydwgl0sfPeti3zZ7.9BaQ9ThE8yzUV3qBcgvukzuK', '2022-12-22');
INSERT INTO public.users VALUES (9, 'victoria', 'victoria@gmail.com', '$2b$15$WUqG/iKllkHanvlLIaGuU..03jpKw8rhpmsIYVe9yvgjO92xt4rnq', '2022-12-22');
INSERT INTO public.users VALUES (10, 'eduarda', 'eduarda@gmail.com', '$2b$15$eUNgpmr4ZlMrxDIjMkToM.X5jzfpZ4L.p.PY0mcq5wSXT7tt.rOo6', '2022-12-22');
INSERT INTO public.users VALUES (11, 'beatriz', 'beatriz@gmail.com', '$2b$15$VYfEoRHVBQcomqmIucjlyu.XAbA1UQmXsS/kBnU0hGtZk6MNPEXMq', '2022-12-22');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

