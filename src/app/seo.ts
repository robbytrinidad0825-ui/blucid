import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateTags(config: SeoConfig) {
    const siteName = 'Blucid Enterprise Inc.';
    const finalTitle = config.title.includes(siteName) ? config.title : `${config.title} | ${siteName}`;
    const defaultImage = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop';
    
    // Set Page Title
    this.title.setTitle(finalTitle);

    // Standard Meta Tags
    this.meta.updateTag({ name: 'description', content: config.description });

    // Open Graph Tags
    this.meta.updateTag({ property: 'og:site_name', content: siteName });
    this.meta.updateTag({ property: 'og:title', content: finalTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:image', content: config.image || defaultImage });
    
    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }

    // Twitter Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: finalTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || defaultImage });
  }
}
