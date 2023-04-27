import {provide} from "vue";
import {defineClientConfig} from "@vuepress/client";
import InstantSearch from 'vue-instantsearch/vue3/es';

import Layout from "./theme/layouts/Layout.vue";
import HomeLayout from "./theme/layouts/HomeLayout.vue";

import bottomLinks from "./config-client/bottomLinks";
import docsCards from "./config-client/docsCards";
import sidebar from "./config-client/sidebar";
import sidebarOption from "./config-client/sidebarOption";
import social from "./config-client/social";

export default defineClientConfig({
    layouts: {
        Layout,
        HomeLayout
    },
    enhance({app}) {
        app.component('InstantSearch', InstantSearch)
    },
    setup() {
        provide('themeConfig', {
            //general
            cloudlinuxSite: "https://cloudlinux.com",
            defaultURL: "/",
            docsBranch: "dev",
            docsCardButtonText: "View tutorial",
            docsCardIcon: "collections-bookmark.svg",
            docsCards,
            docsDir: "docs",
            repo: "cloudlinux/user-docs-solo-cloudlinux",
            submitRequestURL: "https://www.cloudlinux.com/support-portal/",
            try_free: "https://cloudlinux.com/trial",

            // icons
            arrowDownIcon: "/arrow-down.svg",
            editIcon: '/pen.svg',
            footerCustomLogo: 'we-are-cloudlinux.svg',
            hamburgerIcon: "/hamburger.svg",
            headerDefaultSearchIcon: '/search.svg',
            logo: "/logo.svg",
            searchSelectIcon: 'select-down.svg',

            //header
            headerSearch: "CloudLinux Product Documentation",
            headerSearchIcon: '/header-search.svg',
            headerSearchPlaceholder: "Search across all CloudLinux product documentation",
            hideHeading: true,

            //locales
            locales: {
                bottomLinks,
                editLinkText: "Edit this page",
                label: "English",
                selectText: "En",
                sidebar,
                siteTitle: "Documentation",
                stayInTouch: "Stay in touch",
                submitRequest: "Submit support request",
                title: "Language",
                tryFree: "Try Free",
            },

            // products
            productsList: [{
                label: 'CloudLinux'
            }, {
                label: 'Imunify'
            }, {
                label: 'TuxCare'
            }],
            productsText: 'Products',

            //sidebar
            sidebarDepth: 2,
            sidebarOption,

            //social links for footer
            social,

            //algolia
            algoliaOptions: {
                apiKey: "e6b9d79daf71aa98e2e2a51d4556f9d4",
                indexName: "cloudlinuxos",
                appId: "0TCNL6CGX8"
            },
            MAX_ALGOLIA_VISIBLE_RESULT: 10,
        })
    }
})