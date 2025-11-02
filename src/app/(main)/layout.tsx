import React from 'react';
import { GetAllCategories } from 'src/components/actions/actionCategories';
import OfferSlider from 'src/components/home/OfferSlider';
import Footer from 'src/components/shared/Footer';
import Header from 'src/components/shared/Header';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const category = await GetAllCategories();

    const cats = [...new Set(category.map((cat: any) => cat.name))];
    const subCats = cats.map((catName: any) => {
        const subCategories = category
            .filter((cat: any) => cat.name === catName)
            .map((cat: any) => ({
                item: cat.sub_category,
                path: `/collections/${cat.slug}`,
            }));

        return {
            category: catName,
            path: subCategories[0]?.path,
            subcategory: subCategories,
        };
    });

    return (
        <div id="PageContainer" className="page-container">
            <div className="transition-body">
                <Header leftNavs={JSON.stringify(subCats ? subCats : '')} />
                <OfferSlider />
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
