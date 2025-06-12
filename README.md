**This repository is deprecated. Updated documentation is managed at [github.com/safedep/docs](https://github.com/safedep/docs).**


# SafeDep Documentation

The source for `https://docs.safedep.io`

## Getting Started

To start a local environment of this project docs, please do the following

- Clone the repository

```bash
git clone https://github.com/safedep/docs.safedep.io.git
```

- Navigate to the guide directory

```bash
cd docs.safedep.io
```

- Install dependencies

```bash
npm install
```

- Start the development server

```bash
npm start
```

- Navigate to [http://localhost:3000](http://localhost:3000) for accessing the docs.

## Guidelines for Documentation

We will align with the [diataxis](https://diataxis.fr/) documentation style,
however, make the necessary deviation to fit our needs. To summarize the framework

| Type          | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Tutorial      | A tutorial is an experience that takes place under the guidance of a tutor. A tutorial is always learning-oriented.             |
| How-to Guides | How-to guides are directions that guide the reader through a problem or towards a result. How-to guides are goal-oriented.      |
| Reference     | Reference guides are technical descriptions of the machinery and how to operate it. Reference material is information-oriented. |
| Explanation   | Explanation is a discusive treatment of a subject, that permits reflection. Explanation is understanding-oriented.              |

General guidance

- Use the `markdown` file format for the documentation
- All top level documentations are essentially `tutorials`, as they help in high level learning. Keep them short, specific and focus on great developer experience
- All detailed documentation with specific goals should go into `guides` folder
- All API related documentation should go into `api` folder

We are essentially writing *tutorials* and *how-to* guides as part of this documentation.
When the need arises, we will create separate sections for *explanations* (concepts) and *references* to serve as details.

## Reference

* https://diataxis.fr/
