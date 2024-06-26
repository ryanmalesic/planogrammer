/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SectionsImport } from './routes/sections'
import { Route as ItemsImport } from './routes/items'
import { Route as BooksImport } from './routes/books'
import { Route as ItemsIndexImport } from './routes/items.index'
import { Route as BooksIndexImport } from './routes/books.index'
import { Route as SectionsNewImport } from './routes/sections.new'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const SectionsIndexLazyImport = createFileRoute('/sections/')()

// Create/Update Routes

const SectionsRoute = SectionsImport.update({
  path: '/sections',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sections.lazy').then(d => d.Route))

const ItemsRoute = ItemsImport.update({
  path: '/items',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/items.lazy').then(d => d.Route))

const BooksRoute = BooksImport.update({
  path: '/books',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/books.lazy').then(d => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then(d => d.Route))

const SectionsIndexLazyRoute = SectionsIndexLazyImport.update({
  path: '/',
  getParentRoute: () => SectionsRoute,
} as any).lazy(() => import('./routes/sections.index.lazy').then(d => d.Route))

const ItemsIndexRoute = ItemsIndexImport.update({
  path: '/',
  getParentRoute: () => ItemsRoute,
} as any)

const BooksIndexRoute = BooksIndexImport.update({
  path: '/',
  getParentRoute: () => BooksRoute,
} as any).lazy(() => import('./routes/books.index.lazy').then(d => d.Route))

const SectionsNewRoute = SectionsNewImport.update({
  path: '/new',
  getParentRoute: () => SectionsRoute,
} as any).lazy(() => import('./routes/sections.new.lazy').then(d => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/books': {
      id: '/books'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof BooksImport
      parentRoute: typeof rootRoute
    }
    '/items': {
      id: '/items'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof ItemsImport
      parentRoute: typeof rootRoute
    }
    '/sections': {
      id: '/sections'
      path: '/sections'
      fullPath: '/sections'
      preLoaderRoute: typeof SectionsImport
      parentRoute: typeof rootRoute
    }
    '/sections/new': {
      id: '/sections/new'
      path: '/new'
      fullPath: '/sections/new'
      preLoaderRoute: typeof SectionsNewImport
      parentRoute: typeof SectionsImport
    }
    '/books/': {
      id: '/books/'
      path: '/'
      fullPath: '/books/'
      preLoaderRoute: typeof BooksIndexImport
      parentRoute: typeof BooksImport
    }
    '/items/': {
      id: '/items/'
      path: '/'
      fullPath: '/items/'
      preLoaderRoute: typeof ItemsIndexImport
      parentRoute: typeof ItemsImport
    }
    '/sections/': {
      id: '/sections/'
      path: '/'
      fullPath: '/sections/'
      preLoaderRoute: typeof SectionsIndexLazyImport
      parentRoute: typeof SectionsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  BooksRoute: BooksRoute.addChildren({ BooksIndexRoute }),
  ItemsRoute: ItemsRoute.addChildren({ ItemsIndexRoute }),
  SectionsRoute: SectionsRoute.addChildren({
    SectionsNewRoute,
    SectionsIndexLazyRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/books",
        "/items",
        "/sections"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/books": {
      "filePath": "books.tsx",
      "children": [
        "/books/"
      ]
    },
    "/items": {
      "filePath": "items.tsx",
      "children": [
        "/items/"
      ]
    },
    "/sections": {
      "filePath": "sections.tsx",
      "children": [
        "/sections/new",
        "/sections/"
      ]
    },
    "/sections/new": {
      "filePath": "sections.new.tsx",
      "parent": "/sections"
    },
    "/books/": {
      "filePath": "books.index.tsx",
      "parent": "/books"
    },
    "/items/": {
      "filePath": "items.index.tsx",
      "parent": "/items"
    },
    "/sections/": {
      "filePath": "sections.index.lazy.tsx",
      "parent": "/sections"
    }
  }
}
ROUTE_MANIFEST_END */
