import {ChangeDetectionStrategy, Component, inject, AfterViewInit, OnInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, signal, computed} from '@angular/core';
import {isPlatformBrowser, NgClass, SlicePipe, DatePipe, TitleCasePipe, DecimalPipe} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {animate, stagger} from 'motion';
import {PORTFOLIO_PROJECTS} from './portfolio-data';

interface Inquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  productName: string;
  message: string;
  status: 'new' | 'replied';
  createdAt: string;
}

interface DashboardProject {
  id: number | null;
  client: string;
  location: string;
  size: string;
  status: string;
  progress: number;
  description: string;
  startDate: string;
  engineer: string;
  image?: string;
}

interface ServiceJob {
  id: number;
  clientName: string;
  serviceType: string;
  status: 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Canceled';
  scheduledDate: string;
  location: string;
  technician: string;
  notes: string;
  contactNumber: string;
}

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatRippleModule, MatMenuModule, MatButtonModule, MatBadgeModule, NgClass, SlicePipe, DatePipe, TitleCasePipe, DecimalPipe, FormsModule, CdkDropList, CdkDrag, CdkDragHandle],
  template: `
    <div class="min-h-screen bg-[#F8FAFC] lg:flex font-sans text-slate-900 pb-20 lg:pb-0">
      <!-- Sidebar -->
      <aside class="hidden lg:flex flex-col w-72 bg-secondary text-white border-r border-slate-800 relative z-20 shadow-2xl overflow-hidden">
        <div class="p-8">
          <div class="flex items-center gap-3 mb-10 cursor-pointer group" (click)="activeSection.set('dashboard')" (keydown.enter)="activeSection.set('dashboard')" tabindex="0" role="button" matRipple>
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <mat-icon>bolt</mat-icon>
            </div>
            <span class="text-xl font-display font-black tracking-tight">Blucid <span class="text-primary">Admin</span></span>
          </div>

          <nav class="space-y-0.5">
            <a role="button" tabindex="0" (keydown.enter)="activeSection.set('dashboard')" matRipple (click)="activeSection.set('dashboard')" [ngClass]="activeSection() === 'dashboard' ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'" class="flex items-center justify-between gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group">
              <div class="flex items-center gap-4">
                <mat-icon class="transition-colors" [class.text-white]="activeSection() === 'dashboard'">dashboard</mat-icon>
                <span class="text-[50%]">Dashboard</span>
              </div>
            </a>

            <a role="button" tabindex="0" (keydown.enter)="activeSection.set('services')" matRipple (click)="activeSection.set('services')" [ngClass]="activeSection() === 'services' ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'" class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer">
              <mat-icon [class.text-white]="activeSection() === 'services'">handyman</mat-icon>
              <span class="text-[50%]">Manage Services</span>
            </a>

            <a role="button" tabindex="0" (keydown.enter)="activeSection.set('products')" matRipple (click)="activeSection.set('products')" [ngClass]="activeSection() === 'products' ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'" class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer">
              <mat-icon [class.text-white]="activeSection() === 'products'">inventory_2</mat-icon>
              <span class="text-[50%]">Manage Products</span>
            </a>

            <a role="button" tabindex="0" (keydown.enter)="activeSection.set('jobs')" matRipple (click)="activeSection.set('jobs')" [ngClass]="activeSection() === 'jobs' ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'" class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer">
              <mat-icon [class.text-white]="activeSection() === 'jobs'">assignment_turned_in</mat-icon>
              <span class="text-[50%]">Service Orders</span>
            </a>
          </nav>
        </div>

        <div class="mt-auto p-6 bg-black/10">
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow flex flex-col relative h-full lg:h-screen overflow-hidden">
        
        <!-- Image Viewer Modal -->
        @if (selectedViewImage()) {
          <div role="button" tabindex="0" (keydown.enter)="selectedViewImage.set(null)" (keydown.escape)="selectedViewImage.set(null)" class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm transition-all duration-300 animate-in fade-in duration-300" (click)="selectedViewImage.set(null)">
            <img [src]="selectedViewImage()" alt="Enlarged gallery photo" class="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-300" referrerpolicy="no-referrer" (click)="$event.stopPropagation()" (keydown.enter)="$event.stopPropagation()" tabindex="0" role="button">
          </div>
        }

        <!-- Top Header -->
        <header class="flex items-center justify-between px-4 sm:px-8 py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 w-full shadow-sm">
          <!-- Mobile Brand & Breadcrumb -->
          <div class="flex items-center gap-4">
            <div class="hidden lg:flex items-center gap-2">
              <span class="text-slate-400 text-sm font-medium">Admin /</span>
              <span class="text-secondary text-sm font-black">{{ activeSectionLabel() }}</span>
            </div>
            <div class="lg:hidden flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <mat-icon class="!w-5 !h-5 !text-[20px] text-white">bolt</mat-icon>
              </div>
              <span class="text-lg font-display font-black tracking-tight">{{ activeSectionLabel() }}</span>
            </div>
          </div>

          <!-- Desktop Actions -->
          <div class="flex items-center gap-2 sm:gap-4">
            <button mat-icon-button (click)="showNotificationsModal.set(true)" class="text-slate-400 hover:text-primary transition-colors relative">
              <mat-icon [matBadge]="notifications().length" matBadgeColor="warn" matBadgeSize="small" [matBadgeHidden]="notifications().length === 0">notifications</mat-icon>
            </button>
            <button mat-icon-button (click)="isRightSidebarOpen.set(!isRightSidebarOpen())" class="text-slate-500 hover:bg-slate-100 ml-1">
              <mat-icon>{{ isRightSidebarOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </header>

        <!-- Right Sidebar (Overlay) -->
        @if (isRightSidebarOpen()) {
          <!-- Backdrop -->
          <div role="button" tabindex="0" (keydown.enter)="isRightSidebarOpen.set(false)" class="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-500 animate-in fade-in" (click)="isRightSidebarOpen.set(false)"></div>
        }
        
        <!-- Right Sidebar (Drawer) -->
        <div 
          class="fixed inset-y-0 right-0 z-50 bg-secondary text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col w-20 sm:w-24"
          [class.translate-x-0]="isRightSidebarOpen()"
          [class.translate-x-[100%]]="!isRightSidebarOpen()"
        >
          
          <div class="pt-8 pb-4 px-4 flex-grow overflow-y-auto scroll-smooth space-y-4 custom-scrollbar flex flex-col items-center">
            <a role="button" title="My Profile" tabindex="0" (keydown.enter)="activeSection.set('profile'); isRightSidebarOpen.set(false)" (click)="activeSection.set('profile'); isRightSidebarOpen.set(false)" class="flex items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer group" [ngClass]="activeSection() === 'profile' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/5'">
              <mat-icon [class.scale-110]="activeSection() === 'profile'" class="transition-transform group-hover:scale-110 !text-2xl">person_outline</mat-icon>
            </a>
            <a role="button" title="Customer Inquiries" tabindex="0" (keydown.enter)="activeSection.set('inquiries'); isRightSidebarOpen.set(false)" (click)="activeSection.set('inquiries'); isRightSidebarOpen.set(false)" class="flex items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer group" [ngClass]="activeSection() === 'inquiries' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/5'">
              <div class="relative">
                <mat-icon [class.scale-110]="activeSection() === 'inquiries'" class="transition-transform group-hover:scale-110 !text-2xl">mail</mat-icon>
                @if (newInquiriesCount() > 0) {
                  <div class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-secondary"></div>
                }
              </div>
            </a>
            <a role="button" title="Edit Website" tabindex="0" (keydown.enter)="activeSection.set('website'); isRightSidebarOpen.set(false)" (click)="activeSection.set('website'); isRightSidebarOpen.set(false)" class="flex items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer group" [ngClass]="activeSection() === 'website' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/5'">
              <mat-icon [class.scale-110]="activeSection() === 'website'" class="transition-transform group-hover:scale-110 !text-2xl">public</mat-icon>
            </a>

            <a role="button" title="Quick Settings" tabindex="0" (keydown.enter)="activeSection.set('settings'); isRightSidebarOpen.set(false)" (click)="activeSection.set('settings'); isRightSidebarOpen.set(false)" class="flex items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer group" [ngClass]="activeSection() === 'settings' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-white/5'">
              <mat-icon [class.scale-110]="activeSection() === 'settings'" class="transition-transform group-hover:scale-110 !text-2xl">settings</mat-icon>
            </a>
            <button title="Sign Out" (click)="logout()" class="flex items-center justify-center w-14 h-14 rounded-2xl transition-all cursor-pointer group bg-rose-500/10 text-rose-400 hover:bg-rose-500/20">
              <mat-icon class="transition-transform group-hover:scale-110 !text-2xl">logout</mat-icon>
            </button>
          </div>
        </div>

        <!-- Scrollable Content View -->
        <div class="p-4 sm:p-8 overflow-y-auto flex-grow h-[calc(100vh-140px)] lg:h-auto" id="dashboard-scroll-area">
          
          <div [class.hidden]="activeSection() !== 'dashboard'">
            <div class="mb-8">
              <h1 class="text-3xl font-display font-black text-secondary leading-tight">Dashboard Overview</h1>
              <p class="text-slate-800 text-sm mt-1 font-medium">Real-time solar grid & business analytics</p>
            </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            @for (stat of stats(); track stat.label) {
              <div #animateItem class="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-xs relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div class="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-10 transition-all transform group-hover:scale-110 duration-500 pointer-events-none">
                  <mat-icon class="!w-32 !h-32 !text-[8rem]">{{stat.icon}}</mat-icon>
                </div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-6">
                    <div [class]="'w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ' + stat.color">
                      <mat-icon>{{stat.icon}}</mat-icon>
                    </div>
                    <span class="text-emerald-700 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-emerald-100">
                      <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">trending_up</mat-icon>
                      {{stat.trend}}%
                    </span>
                  </div>
                  <h3 class="text-4xl font-display font-black text-secondary mb-1 tracking-tight">{{stat.value}}</h3>
                  <p class="text-slate-800 text-[11px] font-bold uppercase tracking-widest">{{stat.label}}</p>
                </div>
              </div>
            }
          </div>

            <!-- Main Layout Grid -->
            <div class="grid grid-cols-1 gap-8 mb-8">
              <!-- Grid placeholder or other widgets could go here -->
            </div>

            <!-- Projects Table -->
            <div #animateItem class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-xs mb-8">
              <div class="p-6 sm:p-8 border-b border-slate-50">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 class="font-display font-black text-secondary text-xl">Project Status Records</h3>
                    <p class="text-xs text-slate-800 mt-1 font-medium">Monitoring and managing historical and current Project Status</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-3">
                    <button mat-stroked-button [matMenuTriggerFor]="projectPdfStatusMenu" class="!rounded-xl !border-slate-200 hover:!bg-slate-50 transition-colors py-5 !px-5">
                      <mat-icon class="!text-[20px]">picture_as_pdf</mat-icon> <span class="hidden sm:inline">Export PDF ({{projectExportStatus()}})</span>
                    </button>
                    <mat-menu #projectPdfStatusMenu="matMenu" class="!rounded-2xl !p-2">
                       <button mat-menu-item (click)="projectExportStatus.set('All'); downloadProjectsPDF()">All Projects</button>
                       <button mat-menu-item (click)="projectExportStatus.set('In Progress'); downloadProjectsPDF()">In Progress Only</button>
                       <button mat-menu-item (click)="projectExportStatus.set('Completed'); downloadProjectsPDF()">Completed Only</button>
                    </mat-menu>
                    <button mat-flat-button (click)="createNewAdminProject()" class="!rounded-xl !bg-primary !text-white !font-bold !px-6 !py-5 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform">
                      <mat-icon>add</mat-icon> New Project
                    </button>
                  </div>
                </div>
                
                <!-- Category-aware Search Bar at top of categories -->
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
                  <div class="relative w-full">
                    <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</mat-icon>
                    <input type="text" [ngModel]="projectFilter()" (ngModelChange)="projectFilter.set($event)" placeholder="Search by client, location, or status..." class="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  </div>
                </div>
              </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-100">
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary" (click)="projectSort.set({key: 'client', direction: projectSort()?.key === 'client' && projectSort()?.direction === 'asc' ? 'desc' : 'asc'})">Client Name</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary" (click)="projectSort.set({key: 'location', direction: projectSort()?.key === 'location' && projectSort()?.direction === 'asc' ? 'desc' : 'asc'})">Location</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary" (click)="projectSort.set({key: 'size', direction: projectSort()?.key === 'size' && projectSort()?.direction === 'asc' ? 'desc' : 'asc'})">System Size</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary" (click)="projectSort.set({key: 'status', direction: projectSort()?.key === 'status' && projectSort()?.direction === 'asc' ? 'desc' : 'asc'})">Status</th>
                    <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-pointer hover:text-primary" (click)="projectSort.set({key: 'progress', direction: projectSort()?.key === 'progress' && projectSort()?.direction === 'asc' ? 'desc' : 'asc'})">Progress</th>
                    <th class="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  @for (project of filteredProjects(); track project.id) {
                    <tr class="group hover:bg-slate-50 transition-colors cursor-pointer" matRipple (click)="editAdminProject(project)">
                      <td class="px-8 py-5">
                        <div class="flex items-center gap-4">
                          @if(project.image) {
                            <div class="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-xs cursor-pointer group-hover/img:opacity-80 transition-opacity" title="Click to view image" (click)="$event.stopPropagation(); selectedViewImage.set(project.image)" (keydown.enter)="$event.stopPropagation(); selectedViewImage.set(project.image)" tabindex="0" role="button">
                              <img [src]="project.image" class="w-full h-full object-cover" alt="Project Client Image">
                            </div>
                          } @else {
                            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary text-sm font-black border border-blue-100 shadow-xs">
                              {{project.client.charAt(0)}}
                            </div>
                          }
                          <span class="font-bold text-secondary text-sm group-hover:text-primary transition-colors">{{project.client}}</span>
                        </div>
                      </td>
                      <td class="px-8 py-5 text-sm text-slate-500 font-medium whitespace-nowrap">{{project.location}}</td>
                      <td class="px-8 py-5 whitespace-nowrap">
                        <span class="px-3 py-1.5 bg-slate-100 text-secondary text-[11px] font-bold rounded-lg uppercase tracking-widest border border-slate-200">{{project.size}}</span>
                      </td>
                      <td class="px-8 py-5 whitespace-nowrap">
                        <div class="flex items-center gap-2.5">
                          <span class="relative flex h-2.5 w-2.5">
                            @if(project.status === 'In Progress') {
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            }
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5" [class.bg-emerald-500]="project.status === 'Completed'" [class.bg-amber-500]="project.status === 'In Progress'"></span>
                          </span>
                          <span class="text-sm font-bold text-secondary">{{project.status}}</span>
                        </div>
                      </td>
                      <td class="px-8 py-5 w-48 whitespace-nowrap">
                        <div class="flex items-center gap-4">
                          <div class="flex-grow h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div class="h-full rounded-full shadow-md" [class]="project.status === 'Completed' ? 'bg-emerald-500' : 'bg-primary'" [style.width.%]="project.progress"></div>
                          </div>
                          <span class="text-xs font-bold text-secondary min-w-[30px] text-right">{{project.progress}}%</span>
                        </div>
                      </td>
                      <td class="px-4 py-5 text-right">
                        <button mat-icon-button class="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <mat-icon>chevron_right</mat-icon>
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          </div>

          <!-- Project Detail Modal -->
          @if (selectedAdminProject()) {
            <div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
              <!-- Backdrop -->
              <div role="button" tabindex="0" (keydown.enter)="selectedAdminProject.set(null)" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" (click)="selectedAdminProject.set(null)"></div>
              
              <!-- Modal Content -->
              <div class="bg-white rounded-[2.5rem] shadow-2xl relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 sm:px-10 sm:py-8 border-b border-slate-100 bg-white">
                  <div class="flex items-center gap-5">
                    <div class="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                       <mat-icon class="!text-3xl">solar_power</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-2xl font-black font-display text-secondary leading-tight">
                        {{ selectedAdminProject()!.id ? 'Project Details' : 'New Installation' }}
                      </h3>
                      <p class="text-xs font-bold text-slate-800 uppercase tracking-widest mt-1">ID: {{selectedAdminProject()!.id || 'AUTO'}} • {{selectedAdminProject()!.status}}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Body -->
                <div class="p-6 sm:px-10 sm:py-8 overflow-y-auto bg-slate-50/50">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Left Column: Details -->
                    <div class="lg:col-span-2 space-y-6">
                      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Client Information</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="md:col-span-2">
                            <label for="proj-client" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Client / Project Name</label>
                            <input id="proj-client" type="text" [(ngModel)]="selectedAdminProject()!.client" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20">
                          </div>
                          <div class="md:col-span-2">
                            <label for="proj-location" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Installation Location</label>
                            <input id="proj-location" type="text" [(ngModel)]="selectedAdminProject()!.location" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20">
                          </div>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Technical Specifications</h4>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label for="proj-size" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">System Size</label>
                            <input id="proj-size" type="text" [(ngModel)]="selectedAdminProject()!.size" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. 5kW System">
                          </div>
                          <div>
                            <label for="proj-engineer" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Assigned Engineer</label>
                            <input id="proj-engineer" type="text" [(ngModel)]="selectedAdminProject()!.engineer" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20">
                          </div>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex-grow">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Project Description</h4>
                        <textarea id="proj-desc" [(ngModel)]="selectedAdminProject()!.description" rows="5" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Technical details, roof type, component lists..."></textarea>
                      </div>
                    </div>

                    <!-- Right Column: Status & Image -->
                    <div class="space-y-6">
                      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Project Status</h4>
                        <div class="space-y-6">
                          <div>
                              <label for="proj-status" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Current Status</label>
                              <select id="proj-status" [(ngModel)]="selectedAdminProject()!.status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                                <option value="Lead">Lead</option>
                                <option value="Planning">Planning</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Testing">Testing</option>
                                <option value="Completed">Completed</option>
                              </select>
                          </div>
                          <div>
                              <label for="proj-date" class="block text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">Start Date</label>
                              <input id="proj-date" type="date" [(ngModel)]="selectedAdminProject()!.startDate" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20">
                          </div>
                          
                          <div>
                            <div class="flex justify-between items-center mb-3 ml-1">
                                <label for="proj-progress" class="block text-[11px] font-bold text-slate-500 uppercase">Completion Progress</label>
                                <span class="text-sm font-black text-primary">{{selectedAdminProject()!.progress}}%</span>
                            </div>
                            <input id="proj-progress" type="range" [(ngModel)]="selectedAdminProject()!.progress" min="0" max="100" step="5" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary">
                          </div>
                        </div>
                      </div>

                      <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Project Image</h4>
                        <div class="relative rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 group flex items-center justify-center flex-col min-h-[160px] cursor-pointer">
                          @if (selectedAdminProject()!.image) {
                            <img [src]="selectedAdminProject()!.image" class="w-full h-full object-cover absolute inset-0" alt="Main Project Image">
                          } @else {
                            <mat-icon class="text-slate-400 mb-2 mt-4">add_photo_alternate</mat-icon>
                            <span class="text-xs text-slate-500 font-bold mb-4">Upload Main Image</span>
                          }
                          <div class="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity z-20 pointer-events-auto">
                            @if (selectedAdminProject()!.image) {
                              <button (click)="$event.stopPropagation(); selectedViewImage.set(selectedAdminProject()!.image!)" class="text-white text-xs font-bold px-3 py-1.5 bg-black/50 hover:bg-black/70 rounded-lg flex items-center gap-1 transition-colors z-30 cursor-pointer">
                                <mat-icon class="!text-[16px] !w-[16px] !h-[16px] leading-[16px]">zoom_in</mat-icon> View
                              </button>
                            }
                            <button class="text-white text-xs font-bold px-3 py-1.5 bg-black/50 hover:bg-black/70 rounded-lg flex items-center gap-1 relative overflow-hidden transition-colors z-30 cursor-pointer">
                              <mat-icon class="!text-[16px] !w-[16px] !h-[16px] leading-[16px]">upload</mat-icon> {{selectedAdminProject()!.image ? 'Change' : 'Upload'}}
                              <input type="file" accept="image/*" (change)="onImageUpload($event, 'admin-project')" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Footer -->
                <div class="p-6 sm:px-10 sm:py-6 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                  @if (selectedAdminProject()!.id) {
                    <button mat-button (click)="deleteAdminProject()" class="!font-bold !text-rose-500 hover:!bg-rose-50 px-8 transition-colors">Delete Project</button>
                  } @else {
                    <div class="hidden sm:block"></div>
                  }
                  <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button mat-button (click)="selectedAdminProject.set(null)" class="!font-bold !text-slate-500 px-8">Cancel</button>
                    <button mat-flat-button (click)="saveAdminProject()" class="!rounded-xl !bg-primary !text-white !font-bold !px-10 py-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">Save Project Details</button>
                  </div>
                </div>
              </div>
            </div>
          }

          <div [class.hidden]="activeSection() !== 'services'">
            <div class="mb-8 flex flex-col items-start gap-4 pl-1">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Manage Services</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Configure and update your service offerings</p>
              </div>
              <button mat-flat-button (click)="createNewService()" class="!rounded-full !bg-primary !text-white !font-bold !px-6 !py-5 shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform w-full sm:w-auto">
                <mat-icon>add</mat-icon> New Service
              </button>
            </div>
            
            <!-- Full Width Services Table -->
            <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-xs mb-8">
              <div class="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between gap-4">
                <input type="text" [ngModel]="serviceFilter()" (ngModelChange)="serviceFilter.set($event)" placeholder="Search services..." class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64">
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-100">
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="serviceSort.set({key: 'title', direction: serviceSort()?.key === 'title' && serviceSort()?.direction === 'asc' ? 'desc' : 'asc'})">Service Title</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="serviceSort.set({key: 'description', direction: serviceSort()?.key === 'description' && serviceSort()?.direction === 'asc' ? 'desc' : 'asc'})">Description</th>
                      <th class="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    @for (srv of filteredServices(); track srv.id) {
                      <tr class="group hover:bg-slate-50 transition-colors cursor-pointer" matRipple (click)="editService(srv)">
                        <td class="px-8 py-5">
                          <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                               <mat-icon>{{srv.icon}}</mat-icon>
                            </div>
                            <span class="font-bold text-secondary text-sm group-hover:text-primary transition-colors">{{srv.title}}</span>
                          </div>
                        </td>
                        <td class="px-8 py-5 text-sm text-slate-500 font-medium">{{srv.description | slice:0:100}}{{srv.description.length > 100 ? '...' : ''}}</td>
                        <td class="px-8 py-5 text-right">
                          <button mat-icon-button class="text-slate-400 group-hover:text-primary transition-colors">
                            <mat-icon>edit</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Service Modal Edit / Create -->
            @if (selectedService()) {
              <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <!-- Backdrop -->
                <div role="button" tabindex="0" (keydown.enter)="selectedService.set(null)" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="selectedService.set(null)"></div>
                
                <!-- Modal Content -->
                <div class="bg-white rounded-[2rem] shadow-2xl relative w-full lg:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <!-- Header -->
                  <div class="flex items-center justify-between p-6 sm:px-8 border-b border-slate-100 bg-white shadow-sm z-10">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
                         <mat-icon>{{selectedService()!.id ? 'edit' : 'add_circle'}}</mat-icon>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold font-display text-secondary leading-tight">
                          {{ selectedService()!.id ? 'Edit Service' : 'Create New Service' }}
                        </h3>
                        <p class="text-xs font-bold text-slate-800 mt-0.5">Customize service details and steps</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Body -->
                  <div class="p-6 sm:p-8 overflow-y-auto bg-slate-50/50 flex-grow custom-scrollbar">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <!-- Left Column -->
                      <div class="space-y-6">
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-6">
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Service Title</div>
                            <input type="text" [(ngModel)]="selectedService()!.title" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner">
                          </div>
                          
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Material Icon Name</div>
                            <div class="flex gap-4">
                              <input type="text" [(ngModel)]="selectedService()!.icon" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" placeholder="e.g. electrical_services">
                              <div class="w-[50px] h-[50px] rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-500">
                                <mat-icon>{{selectedService()!.icon}}</mat-icon>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</div>
                            <textarea [(ngModel)]="selectedService()!.description" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"></textarea>
                          </div>
                          
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Features (Comma separated)</div>
                            <input type="text" [ngModel]="selectedService()!.features?.join(', ')" (ngModelChange)="updateFeatures($event)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" placeholder="e.g. Site Assessment, Grid Connection">
                          </div>
                        </div>
                      </div>

                      <!-- Right Column -->
                      <div class="space-y-6">
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                          <h4 class="text-sm font-bold text-secondary flex items-center gap-2 mb-4"><mat-icon class="text-slate-400">image</mat-icon> Featured Image</h4>
                          
                          <div class="flex flex-col xl:flex-row gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 relative">
                            <div class="w-full sm:w-28 h-40 sm:h-28 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-inner relative group/svc-img">
                              @if (selectedService()!.image) {
                                <img [src]="selectedService()!.image" class="w-full h-full object-cover" alt="service image">
                                <div class="absolute inset-0 bg-secondary/40 flex items-center justify-center opacity-0 group-hover/svc-img:opacity-100 transition-opacity backdrop-blur-[2px]">
                                  <button (click)="selectedService()!.image = ''" class="p-1.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-lg" title="Erase Image">
                                    <mat-icon class="!text-sm !w-auto !h-auto">delete</mat-icon>
                                  </button>
                                </div>
                              } @else {
                                <mat-icon class="text-slate-200 !text-4xl flex items-center justify-center">add_photo_alternate</mat-icon>
                              }
                            </div>
                            <div class="flex-grow w-full space-y-2">
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Source URL</div>
                              <input type="text" [(ngModel)]="selectedService()!.image" placeholder="https://" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm">
                              
                              <button mat-stroked-button class="w-full !rounded-xl !border-slate-200 !text-slate-500 hover:!bg-slate-100 !h-10 relative overflow-hidden !text-xs !font-bold tracking-wide">
                                <span class="flex items-center gap-1.5 justify-center"><mat-icon class="!text-[16px]">file_upload</mat-icon> Upload Image File</span>
                                <input type="file" accept="image/*" (change)="onImageUpload($event, 'service')" class="absolute inset-0 opacity-0 cursor-pointer">
                              </button>
                            </div>
                          </div>
                        </div>

                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col max-h-[400px]">
                          <div class="flex justify-between items-center mb-4 shrink-0">
                            <div>
                              <h4 class="text-sm font-bold text-secondary flex items-center gap-2"><mat-icon class="text-slate-400">format_list_numbered</mat-icon> Step-by-Step Process</h4>
                            </div>
                            <button mat-flat-button class="!bg-blue-50 !text-blue-600 !font-bold !rounded-xl !h-[36px] px-4 hover:!bg-blue-100 transition-colors" (click)="addServiceProcess()">
                              <span class="flex items-center gap-1.5"><mat-icon class="!text-[18px]">add</mat-icon> <span class="hidden sm:inline">Add Step</span></span>
                            </button>
                          </div>
                          
                          <div class="space-y-4 overflow-y-auto pr-2 custom-scrollbar pb-2">
                            @for (step of selectedService()!.process; track $index; let i = $index) {
                              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group/step shadow-sm">
                                <button mat-icon-button class="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md border border-slate-100 !w-8 !h-8 flex items-center justify-center opacity-0 group-hover/step:opacity-100 transition-opacity hover:scale-110 hover:bg-rose-50" (click)="removeServiceProcess(i)">
                                  <mat-icon class="!text-[16px] flex items-center justify-center">close</mat-icon>
                                </button>
                                <div class="flex flex-col gap-3">
                                  <div class="flex items-center gap-2 mb-1">
                                    <div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black">{{i + 1}}</div>
                                    <input type="text" [(ngModel)]="selectedService()!.process[i].title" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm" placeholder="Title">
                                  </div>
                                  <div>
                                    <textarea [(ngModel)]="selectedService()!.process[i].desc" rows="2" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-secondary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm" placeholder="Description"></textarea>
                                  </div>
                                </div>
                              </div>
                            }
                            @if (!selectedService()!.process || selectedService()!.process.length === 0) {
                              <div class="flex flex-col items-baseline justify-center py-8 px-4 text-center border border-dashed border-slate-300 rounded-2xl bg-white">
                                <p class="text-xs font-bold text-slate-800 w-full">No process steps added.</p>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div class="p-6 sm:px-8 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-4 z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                    @if (selectedService()!.id) {
                      <button mat-button (click)="deleteService()" class="!font-bold !text-rose-500 hover:!bg-rose-50 rounded-xl px-6 w-full sm:w-auto">Delete Service</button>
                    } @else {
                      <div class="hidden sm:block"></div>
                    }
                    <div class="flex gap-3 w-full sm:w-auto">
                      <button mat-button (click)="selectedService.set(null)" class="!font-bold w-full sm:w-auto px-6 rounded-xl hover:bg-slate-50">Cancel</button>
                      <button mat-flat-button (click)="confirmSaveService()" class="!rounded-xl !bg-blue-600 !text-white !font-bold !px-10 !py-6 w-full sm:w-auto shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                        {{ selectedService()!.id ? 'Save Changes' : 'Publish Service' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div [class.hidden]="activeSection() !== 'products'">
            <div class="mb-8 flex flex-col items-start gap-4 pl-1">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Website Products</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Manage solar products, inventory, and pricing</p>
              </div>
              <button mat-flat-button (click)="createNewProduct()" class="!rounded-full !bg-emerald-500 !text-white !font-bold !px-6 !py-5 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform w-full sm:w-auto">
                <mat-icon>add</mat-icon> New Product
              </button>
            </div>
            
            <!-- Full Width Products Table -->
            <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-xs mb-8">
              <div class="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between gap-4">
                <input type="text" [ngModel]="productFilter()" (ngModelChange)="productFilter.set($event)" placeholder="Search products..." class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-64">
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-100">
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600" (click)="productSort.set({key: 'name', direction: productSort()?.key === 'name' && productSort()?.direction === 'asc' ? 'desc' : 'asc'})">Product Name</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600" (click)="productSort.set({key: 'category', direction: productSort()?.key === 'category' && productSort()?.direction === 'asc' ? 'desc' : 'asc'})">Category</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600" (click)="productSort.set({key: 'stockCount', direction: productSort()?.key === 'stockCount' && productSort()?.direction === 'asc' ? 'desc' : 'asc'})">Stock Info</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600" (click)="productSort.set({key: 'inStock', direction: productSort()?.key === 'inStock' && productSort()?.direction === 'asc' ? 'desc' : 'asc'})">Status</th>
                      <th class="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    @for (prod of filteredProducts(); track prod.id) {
                      <tr class="group hover:bg-slate-50 transition-colors cursor-pointer" matRipple (click)="editProduct(prod)">
                        <td class="px-8 py-5">
                          <div class="flex items-center gap-4">
                            <img [src]="prod.images[0]" class="w-10 h-10 object-cover rounded-lg" alt="product">
                            <span class="font-bold text-secondary text-sm group-hover:text-emerald-600 transition-colors">{{prod.name}}</span>
                          </div>
                        </td>
                        <td class="px-8 py-5 text-sm text-slate-500 font-medium">{{prod.category}}</td>
                        <td class="px-8 py-5">
                          <div class="flex items-center gap-2">
                             <div class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" [class]="prod.stockCount > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'">{{prod.stockCount}} Units</div>
                          </div>
                        </td>
                        <td class="px-8 py-5 text-sm font-bold" [class]="prod.inStock ? 'text-blue-500' : 'text-rose-500'">{{prod.inStock ? 'In Stock' : 'Out of Stock'}}</td>
                        <td class="px-8 py-5 text-right">
                          <button mat-icon-button class="text-slate-400 group-hover:text-emerald-600 transition-colors">
                            <mat-icon>edit</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Product Modal Edit / Create -->
            @if (selectedProduct()) {
              <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <!-- Backdrop -->
                <div role="button" tabindex="0" (keydown.enter)="selectedProduct.set(null)" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="selectedProduct.set(null)"></div>
                
                <!-- Modal Content -->
                <div class="bg-white rounded-[2rem] shadow-2xl relative w-full lg:max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <!-- Header -->
                  <div class="flex items-center justify-between p-6 sm:px-8 border-b border-slate-100 bg-white shadow-sm z-10">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
                         <mat-icon>{{selectedProduct()!.id ? 'edit' : 'add_circle'}}</mat-icon>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold font-display text-secondary leading-tight">
                          {{ selectedProduct()!.id ? 'Edit Product' : 'Create New Product' }}
                        </h3>
                        <p class="text-xs font-bold text-slate-800 mt-0.5">Manage inventory details and product gallery</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Body -->
                  <div class="p-6 sm:p-8 overflow-y-auto bg-slate-50/50 flex-grow custom-scrollbar">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <!-- Left Column: Core Data -->
                      <div class="space-y-6">
                        <!-- Basic Info Card -->
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-5">
                          <h4 class="text-sm font-bold text-secondary flex items-center gap-2 mb-2"><mat-icon class="text-slate-400">info</mat-icon> Basic Information</h4>
                          
                          <!-- Product Name -->
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Product Name</div>
                            <input type="text" [(ngModel)]="selectedProduct()!.name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner">
                          </div>

                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="space-y-1.5">
                              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="product-category">Category</label>
                              <div class="relative">
                                <input type="text" [(ngModel)]="selectedProduct()!.category" list="category-list" id="product-category"
                                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-inner"
                                  placeholder="Type or select">
                                <datalist id="category-list">
                                  @for (cat of availableCategories(); track cat) {
                                    <option [value]="cat">{{cat}}</option>
                                  }
                                </datalist>
                                <mat-icon class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 !text-lg">category</mat-icon>
                              </div>
                            </div>
                          </div>

                          <!-- Description -->
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</div>
                            <textarea [(ngModel)]="selectedProduct()!.desc" rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-secondary focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"></textarea>
                          </div>
                        </div>

                        <!-- Inventory Card -->
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm space-y-5">
                          <h4 class="text-sm font-bold text-secondary flex items-center gap-2 mb-2"><mat-icon class="text-slate-400">inventory</mat-icon> Inventory Settings</h4>
                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                            <div class="space-y-1.5">
                              <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="product-stock">Stock Level (Units)</label>
                              <input type="number" [(ngModel)]="selectedProduct()!.stockCount" id="product-stock"
                                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-inner"
                                placeholder="0">
                            </div>
                            <div>
                              <div (click)="selectedProduct()!.inStock = !selectedProduct()!.inStock" (keydown.enter)="selectedProduct()!.inStock = !selectedProduct()!.inStock" role="button" tabindex="0" 
                                class="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border-2 w-full hover:border-emerald-500/30 transition-all cursor-pointer group shadow-sm select-none"
                                [class.border-emerald-500]="selectedProduct()!.inStock"
                                [class.border-slate-200]="!selectedProduct()!.inStock">
                                <div class="flex items-center gap-2">
                                  <div class="w-6 h-6 rounded-md flex items-center justify-center transition-colors" [class.bg-emerald-500]="selectedProduct()!.inStock" [class.text-white]="selectedProduct()!.inStock" [class.bg-slate-100]="!selectedProduct()!.inStock" [class.text-slate-400]="!selectedProduct()!.inStock">
                                    <mat-icon class="!text-[14px]">check</mat-icon>
                                  </div>
                                  <span class="text-[10px] font-black uppercase tracking-widest" [class.text-emerald-700]="selectedProduct()!.inStock" [class.text-slate-400]="!selectedProduct()!.inStock">
                                    {{ selectedProduct()!.inStock ? 'In Stock' : 'Out of Stock' }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Right Column: Visuals & Tech Specs -->
                      <div class="space-y-6">
                        <!-- Image Gallery Card -->
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col max-h-[600px]">
                          <div class="flex justify-between items-center mb-4 shrink-0">
                            <div>
                              <h4 class="text-sm font-bold text-secondary flex items-center gap-2"><mat-icon class="text-slate-400">collections</mat-icon> Product Gallery</h4>
                              <p class="text-[10px] text-slate-800 font-medium">Reorder or add multiple photos</p>
                            </div>
                            <button mat-flat-button class="!bg-emerald-50 !text-emerald-600 !font-bold !rounded-xl !h-[36px] relative overflow-hidden px-4 hover:!bg-emerald-100 transition-colors">
                              <span class="flex items-center gap-1.5"><mat-icon class="!text-[16px]">add_photo_alternate</mat-icon> <span class="hidden sm:inline">Upload Multiple</span></span>
                              <input type="file" multiple accept="image/*" title="Upload Photos" (change)="onImageUpload($event, 'product', selectedProduct()!.images.length)" class="absolute inset-0 opacity-0 cursor-pointer">
                            </button>
                          </div>

                          <!-- Drag & Drop Zone -->
                          <div 
                            class="mb-4 p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 gap-2 cursor-pointer relative group"
                            [class.border-emerald-500]="isDraggingImages()"
                            [class.bg-emerald-50]="isDraggingImages()"
                            [class.border-slate-200]="!isDraggingImages()"
                            (dragover)="onDragOver($event)"
                            (dragleave)="onDragLeave($event)"
                            (drop)="onFilesDropped($event, 'product', selectedProduct()!.images.length)">
                            
                            <div class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-emerald-500 transition-all">
                              <mat-icon class="!text-[24px]">cloud_upload</mat-icon>
                            </div>
                            <div class="text-center">
                              <p class="text-xs font-bold text-slate-800">Drop images here</p>
                              <p class="text-[10px] text-slate-800">or click the upload button above</p>
                            </div>
                          </div>
                          
                          <div class="space-y-4 overflow-y-auto pr-2 custom-scrollbar pb-2">
                            @for (img of selectedProduct()!.images; track $index; let i = $index) {
                              <div class="flex flex-col xl:flex-row gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group/imgrow animate-in fade-in slide-in-from-bottom-2 duration-300" [style.animation-delay]="i * 50 + 'ms'">
                                <!-- Reorder Controls -->
                                <div class="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/imgrow:opacity-100 transition-opacity z-20">
                                  <button (click)="moveProductImage(i, 'up')" [disabled]="i === 0" class="w-7 h-7 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed">
                                    <mat-icon class="!text-[16px]">expand_less</mat-icon>
                                  </button>
                                  <button (click)="moveProductImage(i, 'down')" [disabled]="i === selectedProduct()!.images.length - 1" class="w-7 h-7 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed">
                                    <mat-icon class="!text-[16px]">expand_more</mat-icon>
                                  </button>
                                </div>

                                <!-- Delete Button -->
                                <button mat-icon-button class="absolute -top-3 -right-3 bg-white text-rose-500 shadow-md border border-slate-100 !w-8 !h-8 flex items-center justify-center opacity-0 group-hover/imgrow:opacity-100 transition-opacity z-10 hover:bg-rose-50 hover:scale-110" (click)="removeProductImage(i)">
                                  <mat-icon class="!text-[16px] flex items-center justify-center">close</mat-icon>
                                </button>
                                
                                <div class="w-full sm:w-28 h-40 sm:h-28 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-inner relative group/imgview">
                                  @if (selectedProduct()!.images[i]) {
                                    <img [src]="selectedProduct()!.images[i]" class="w-full h-full object-cover" alt="product image">
                                    <div class="absolute inset-0 bg-secondary/40 flex items-center justify-center opacity-0 group-hover/imgview:opacity-100 transition-opacity backdrop-blur-[2px]">
                                      <button mat-icon-button (click)="$event.stopPropagation(); selectedViewImage.set(selectedProduct()!.images[i])" class="text-white hover:text-emerald-300 bg-white/20 rounded-full" title="View Image">
                                        <mat-icon>zoom_in</mat-icon>
                                      </button>
                                    </div>
                                  } @else {
                                    <mat-icon class="text-slate-200 !text-3xl flex items-center justify-center">add_photo_alternate</mat-icon>
                                  }
                                  <div class="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black w-4 h-4 rounded flex items-center justify-center shadow-sm">{{i + 1}}</div>
                                </div>
                                <div class="flex-grow w-full space-y-2">
                                  <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image Source URL</div>
                                  <div class="flex items-center gap-2">
                                    <input type="text" [(ngModel)]="selectedProduct()!.images[i]" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-secondary focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" placeholder="Paste URL or upload file...">
                                    @if(selectedProduct()!.images[i]) {
                                      <button mat-icon-button (click)="selectedProduct()!.images[i] = ''" class="!w-10 !h-10 text-slate-400 hover:text-rose-500 hover:bg-rose-50 shrink-0 border border-slate-200 rounded-xl" title="Clear Field">
                                        <mat-icon class="!text-[18px] flex items-center justify-center">refresh</mat-icon>
                                      </button>
                                    }
                                  </div>
                                  <button mat-stroked-button class="w-full !rounded-xl !border-slate-200 !text-slate-500 hover:!bg-slate-100 !h-10 relative overflow-hidden flex-1 !text-xs !font-bold tracking-wide">
                                    <span class="flex items-center gap-1.5 justify-center"><mat-icon class="!text-[16px]">file_upload</mat-icon> Replace Photo</span>
                                    <input type="file" title="Upload Replacement File" accept="image/*" (change)="onImageUpload($event, 'product', i)" class="absolute inset-0 opacity-0 cursor-pointer">
                                  </button>
                                </div>
                              </div>
                            }
                            @if (!selectedProduct()!.images || selectedProduct()!.images.length === 0) {
                              <div class="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                                <mat-icon class="text-slate-300 !w-12 !h-12 !text-[48px] mb-3 relative">cloud_upload</mat-icon>
                                <p class="text-sm font-bold text-slate-800 mb-2">No product photos added</p>
                                <button mat-flat-button class="!bg-emerald-500 !text-white !font-bold !rounded-xl relative overflow-hidden shadow-lg shadow-emerald-500/20">
                                  <span class="flex items-center gap-2"><mat-icon class="!text-[18px]">file_upload</mat-icon> Browse Files</span>
                                  <input type="file" multiple accept="image/*" (change)="onImageUpload($event, 'product', selectedProduct()!.images.length)" class="absolute inset-0 opacity-0 cursor-pointer">
                                </button>
                              </div>
                            }
                          </div>
                        </div>

                        <!-- Technical Specs Card -->
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm grow flex flex-col">
                          <div class="flex justify-between items-center mb-4">
                            <div>
                              <h4 class="text-sm font-bold text-secondary flex items-center gap-2"><mat-icon class="text-slate-400">tune</mat-icon> Specifications</h4>
                            </div>
                            <button mat-button class="!text-emerald-600 !font-bold !text-xs !py-0 !h-8 bg-emerald-50 rounded-lg hover:bg-emerald-100" (click)="addProductSpec()">+ Add Spec</button>
                          </div>
                          <div class="space-y-3 overflow-y-auto scroll-smooth max-h-[300px] pr-2 custom-scrollbar">
                            @for (spec of selectedProduct()!.specs; track $index; let i = $index) {
                              <div class="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 relative group/spec">
                                <input type="text" [(ngModel)]="selectedProduct()!.specs[i].label" class="w-1/3 min-w-[100px] bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-bold text-secondary focus:border-emerald-500 outline-none transition-all shadow-sm" placeholder="Label">
                                <input type="text" [(ngModel)]="selectedProduct()!.specs[i].value" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-secondary focus:border-emerald-500 outline-none transition-all shadow-sm" placeholder="Value">
                                <button mat-icon-button class="text-slate-300 hover:text-rose-500 shrink-0 !w-8 !h-8 rounded-lg transition-colors" (click)="removeProductSpec(i)">
                                  <mat-icon class="!text-[18px] flex items-center justify-center">remove_circle</mat-icon>
                                </button>
                              </div>
                            }
                            @if (!selectedProduct()!.specs || selectedProduct()!.specs.length === 0) {
                              <div class="py-6 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                                <p class="text-xs font-bold text-slate-800">No specifications defined</p>
                              </div>
                            }
                          </div>
                        </div>

                        <!-- Product Badges / Features -->
                        <div class="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm mt-6">
                           <div class="flex justify-between items-center mb-4">
                            <div>
                              <h4 class="text-sm font-bold text-secondary flex items-center gap-2"><mat-icon class="text-slate-400">assistant</mat-icon> Product Badges</h4>
                            </div>
                            <button mat-button class="!text-emerald-600 !font-bold !text-xs !py-0 !h-8 bg-emerald-50 rounded-lg hover:bg-emerald-100" (click)="addProductFeature()">+ Add Badge</button>
                          </div>
                          <div class="space-y-3">
                            @for (feat of selectedProduct()!.features; track $index; let i = $index) {
                              <div class="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-100 relative group/feat">
                                <div class="relative group/icon">
                                  <input type="text" [(ngModel)]="selectedProduct()!.features[i].icon" class="w-24 bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-2.5 text-xs font-bold text-secondary focus:border-emerald-500 outline-none transition-all shadow-sm" placeholder="Icon">
                                  <mat-icon class="absolute left-2 top-1/2 -translate-y-1/2 !text-base text-primary">{{selectedProduct()!.features[i].icon}}</mat-icon>
                                </div>
                                <input type="text" [(ngModel)]="selectedProduct()!.features[i].text" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-secondary focus:border-emerald-500 outline-none transition-all shadow-sm" placeholder="Badge Text (e.g. Genuine Product)">
                                <button mat-icon-button class="text-slate-300 hover:text-rose-500 shrink-0 !w-8 !h-8 rounded-lg transition-colors" (click)="removeProductFeature(i)">
                                  <mat-icon class="!text-[18px] flex items-center justify-center">remove_circle</mat-icon>
                                </button>
                              </div>
                            }
                            @if (!selectedProduct()!.features || selectedProduct()!.features.length === 0) {
                              <div class="py-6 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                                <p class="text-xs font-bold text-slate-800">No badges defined</p>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div class="p-6 sm:px-8 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-4 z-10 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                    @if (selectedProduct()!.id) {
                      <button mat-button (click)="deleteProduct()" class="!font-bold !text-rose-500 hover:!bg-rose-50 rounded-xl px-6 w-full sm:w-auto">Delete Product</button>
                    } @else {
                      <div class="hidden sm:block"></div>
                    }
                    <div class="flex gap-3 w-full sm:w-auto">
                      <button mat-button (click)="selectedProduct.set(null)" class="!font-bold w-full sm:w-auto px-6 rounded-xl hover:bg-slate-50">Cancel</button>
                      <button mat-flat-button (click)="confirmSaveProduct()" class="!rounded-xl !bg-emerald-600 hover:!bg-emerald-700 !text-white !font-bold !px-10 !py-6 w-full sm:w-auto shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-transform">
                        {{ selectedProduct()!.id ? 'Save Changes' : 'Publish Product' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div [class.hidden]="activeSection() !== 'jobs'">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Service Job Orders</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Monitor and manage upcoming technical service requests</p>
              </div>
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <button mat-stroked-button [matMenuTriggerFor]="servicePdfStatusMenu" class="!rounded-xl !border-slate-200 hover:!bg-slate-50 transition-colors w-full sm:w-auto py-5 !px-5">
                  <mat-icon class="!text-[20px]">picture_as_pdf</mat-icon> <span class="hidden sm:inline">Export PDF ({{serviceExportStatus()}})</span>
                </button>
                <mat-menu #servicePdfStatusMenu="matMenu" class="!rounded-2xl !p-2">
                   <button mat-menu-item (click)="serviceExportStatus.set('All'); downloadServiceJobsPDF()">All Jobs</button>
                   <button mat-menu-item (click)="serviceExportStatus.set('Pending'); downloadServiceJobsPDF()">Pending Only</button>
                   <button mat-menu-item (click)="serviceExportStatus.set('Scheduled'); downloadServiceJobsPDF()">Scheduled Only</button>
                   <button mat-menu-item (click)="serviceExportStatus.set('In Progress'); downloadServiceJobsPDF()">In Progress Only</button>
                   <button mat-menu-item (click)="serviceExportStatus.set('Completed'); downloadServiceJobsPDF()">Completed Only</button>
                </mat-menu>
                <button mat-flat-button (click)="openAddServiceJob()" class="!rounded-xl !bg-primary !text-white !font-bold !px-8 !py-5 shadow-lg shadow-blue-500/20 flex-grow sm:flex-none">
                  <mat-icon class="!text-[20px]">add_circle</mat-icon> File New Service Job
                </button>
              </div>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-[2rem] p-6 mb-8 border border-slate-200/60 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <div class="relative flex-grow w-full">
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</mat-icon>
                <input type="text" [ngModel]="serviceJobFilter()" (ngModelChange)="serviceJobFilter.set($event)" placeholder="Search by client, location, technician..." class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              </div>
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <button mat-button class="!bg-slate-50 !text-slate-500 !font-bold !rounded-xl !px-6" [matMenuTriggerFor]="sortJobsMenu">
                   Sort: {{serviceJobSort() ? (serviceJobSort()?.key | titlecase) : 'Default'}} <mat-icon iconPositionEnd>expand_more</mat-icon>
                </button>
                <mat-menu #sortJobsMenu="matMenu" class="!rounded-2xl !p-2">
                   <button mat-menu-item (click)="serviceJobSort.set({key: 'scheduledDate', direction: 'asc'})">By Schedule (Newest)</button>
                   <button mat-menu-item (click)="serviceJobSort.set({key: 'clientName', direction: 'asc'})">By Client Name</button>
                   <button mat-menu-item (click)="serviceJobSort.set({key: 'status', direction: 'asc'})">By Status</button>
                </mat-menu>
              </div>
            </div>

            <!-- Jobs Table -->
            <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-sm mb-8">
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-100">
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Job ID</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Contact</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Type</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule & Location</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Technician</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                      <th class="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    @for (job of filteredServiceJobs(); track job.id) {
                      <tr class="hover:bg-slate-50/50 transition-colors group cursor-pointer" (click)="editServiceJob(job)">
                        <td class="px-8 py-5">
                          <span class="text-xs font-mono font-bold text-slate-400">#{{job.id}}</span>
                        </td>
                        <td class="px-8 py-5">
                          <div class="flex flex-col">
                            <span class="text-sm font-bold text-secondary">{{job.clientName}}</span>
                            <span class="text-[10px] text-slate-400 font-medium">{{job.contactNumber}}</span>
                          </div>
                        </td>
                        <td class="px-8 py-5">
                          <div class="flex items-center gap-2">
                             <mat-icon class="!text-sm text-primary">engineering</mat-icon>
                             <span class="text-xs font-bold text-slate-600">{{job.serviceType}}</span>
                          </div>
                        </td>
                        <td class="px-8 py-5">
                          <div class="flex flex-col">
                             <div class="flex items-center gap-1 text-slate-900 font-bold text-xs mb-0.5">
                                <mat-icon class="!text-[14px] !w-auto !h-auto">calendar_today</mat-icon>
                                {{job.scheduledDate | date:'mediumDate'}}
                             </div>
                             <div class="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
                                <mat-icon class="!text-[12px] !w-auto !h-auto">location_on</mat-icon>
                                {{job.location}}
                             </div>
                          </div>
                        </td>
                        <td class="px-8 py-5 text-sm text-slate-500 font-medium">
                           <div class="flex items-center gap-2">
                              <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-black">{{job.technician.charAt(0)}}</div>
                              {{job.technician}}
                           </div>
                        </td>
                        <td class="px-8 py-5">
                          <div class="flex justify-center">
                            <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap" 
                              [ngClass]="{
                                'bg-amber-50 text-amber-600': job.status === 'Pending',
                                'bg-blue-50 text-blue-600': job.status === 'Scheduled',
                                'bg-purple-50 text-purple-600': job.status === 'In Progress',
                                'bg-emerald-50 text-emerald-600': job.status === 'Completed',
                                'bg-rose-50 text-rose-600': job.status === 'Canceled'
                              }">
                              {{job.status}}
                            </span>
                          </div>
                        </td>
                        <td class="px-8 py-5 text-right">
                          <button mat-icon-button (click)="editServiceJob(job)" class="text-slate-300 hover:text-primary transition-colors">
                            <mat-icon>edit</mat-icon>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
                @if (filteredServiceJobs().length === 0) {
                   <div class="py-20 text-center">
                      <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                         <mat-icon class="!text-slate-200 !text-4xl text-inherit">assignment_late</mat-icon>
                      </div>
                      <h4 class="text-secondary font-bold">No job orders found</h4>
                      <p class="text-slate-800 text-xs mt-1">Try adjusting your filters or create a new job entry.</p>
                   </div>
                }
              </div>
            </div>
          </div>

          <div [class.hidden]="activeSection() !== 'website'">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Edit Website</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Customize your landing page and public portal</p>
              </div>
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <button mat-stroked-button (click)="previewWebsite()" class="!rounded-xl !border-primary !text-primary !font-bold !px-6 w-full sm:w-auto hover:!bg-primary/5">
                  <span class="flex items-center gap-2"><mat-icon class="!text-[20px]">preview</mat-icon> Preview</span>
                </button>
                <button mat-flat-button (click)="saveWebsiteContent()" class="!rounded-xl !bg-primary !text-white !font-bold !px-8 shadow-lg shadow-blue-500/20 w-full sm:w-auto">
                  Save Changes
                </button>
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-700">
              @for (tab of ['home', 'services', 'products', 'about', 'contact', 'faq', 'footer']; track tab) {
                <button 
                  (click)="activeWebsiteTab.set($any(tab))" 
                  class="px-6 py-3 font-bold text-sm capitalize rounded-t-xl transition-colors border-b-2 shrink-0"
                  [ngClass]="activeWebsiteTab() === tab ? 'text-primary border-primary bg-primary/5' : 'text-slate-500 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'">
                  {{ tab === 'home' ? 'Home Page Configuration' : (tab | titlecase) }}
                </button>
              }
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-3xl p-4 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm relative">
              @if (activeWebsiteTab() === 'home') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">home</mat-icon> 
                       Home Page Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Global Sections & Elements</p>
                  </div>
                  <div class="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <mat-icon class="text-slate-400 !text-sm">info</mat-icon>
                    <span class="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Auto-scaling Layouts</span>
                  </div>
                </div>
                
                <div class="space-y-6">
                  
                  <!-- Hero Section (Accordion Style) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'hero' ? '' : 'hero')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'hero' ? '' : 'hero')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>view_carousel</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Hero Configuration</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Main Banner & Intro Text</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'hero'">expand_more</mat-icon>
                    </div>
                    
                    @if (activeAccordionSection() === 'hero') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="mb-8">
                          <div class="flex items-center justify-between mb-4">
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <mat-icon class="!text-xs !w-auto !h-auto">photo_library</mat-icon> Hero Carousel Images
                            </div>
                            <button mat-button class="!text-primary !font-black !text-[10px] !bg-primary/5 !rounded-lg" (click)="addHeroImage()">+ ADD PHOTO</button>
                          </div>
                          
                          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            @for (himg of websiteData().home.heroImages; track $index; let hi = $index) {
                              <div class="relative aspect-video rounded-2xl bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-700 group/hero-img shadow-sm">
                                <img [src]="himg" class="w-full h-full object-cover transition-transform duration-500 group-hover/hero-img:scale-110" referrerpolicy="no-referrer" alt="Hero slide">
                                <div class="absolute inset-0 bg-secondary/60 opacity-0 group-hover/hero-img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <div class="relative w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-secondary rounded-lg flex items-center justify-center transition-all backdrop-blur-md">
                                    <mat-icon class="!text-[16px]">upload</mat-icon>
                                    <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', hi, 'home-hero')" class="absolute inset-0 opacity-0 cursor-pointer">
                                  </div>
                                  <button (click)="removeHeroImage(hi)" class="w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg">
                                    <mat-icon class="!text-[16px]">delete</mat-icon>
                                  </button>
                                </div>
                                @if (hi === 0) {
                                  <div class="absolute top-2 left-2 bg-primary text-white text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded shadow-sm">Main</div>
                                }
                              </div>
                            }
                          </div>
                          <p class="text-[9px] text-slate-800 font-bold mt-3 uppercase tracking-wider px-1">* Images will auto-play as a carousel on the home page. Ideal size: 1920x1080px.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          
                          <div class="space-y-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                  <mat-icon class="!text-xs !w-auto !h-auto">format_bold</mat-icon> Main Headline
                                </div>
                                <textarea [(ngModel)]="websiteData().home.heroTitle" rows="3" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-base font-black text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-sm placeholder:text-slate-300" placeholder="Main Hero Title..."></textarea>
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                  <mat-icon class="!text-xs !w-auto !h-auto">text_fields</mat-icon> Trust indicator Label
                                </div>
                                <div class="relative">
                                  <input type="text" [(ngModel)]="websiteData().home.heroTrustText" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-12 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                                  <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-primary">verified</mat-icon>
                                </div>
                            </div>
                          </div>
                          
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">segment</mat-icon> Supporting Subtitle
                              </div>
                              <textarea [(ngModel)]="websiteData().home.heroSubtitle" rows="7" class="w-full h-[calc(100%-32px)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-sm leading-relaxed" placeholder="Supporting text content..."></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Brands Marquee Section (Accordion Style) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'brands' ? '' : 'brands')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'brands' ? '' : 'brands')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>branding_watermark</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Partner Ecosystem</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Scrolling Brands & Suppliers</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="hidden sm:flex bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{{websiteData().home.brands?.length || 0}} Active</div>
                        <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'brands'">expand_more</mat-icon>
                      </div>
                    </div>
                    
                    @if (activeAccordionSection() === 'brands') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="flex justify-between items-center mb-6">
                           <p class="text-[10px] font-black text-slate-800 uppercase tracking-widst">Managed Brand Cards</p>
                           <button mat-flat-button class="!bg-primary !text-white !font-black !rounded-xl shadow-lg shadow-primary/20" (click)="addBrand()">
                             <mat-icon class="!text-sm">add</mat-icon> New Brand
                           </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          @for (brand of websiteData().home.brands; track $index; let i = $index) {
                            <div class="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 relative group animate-in zoom-in-95 duration-300 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                              <button (click)="removeBrand(i)" class="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl z-20 hover:scale-110 active:scale-95">
                                <mat-icon class="!text-sm">close</mat-icon>
                              </button>
                              
                              <div class="flex-grow space-y-6">
                                <!-- Brand Logo Display -->
                                <div class="relative aspect-video rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden group/logo flex items-center justify-center p-4">
                                  @if (brand.img) {
                                    <img [src]="brand.img" [alt]="brand.name" class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover/logo:scale-110" referrerpolicy="no-referrer">
                                  } @else if (brand.icon) {
                                    <div class="flex flex-col items-center gap-2">
                                      <mat-icon class="!text-3xl text-primary">{{brand.icon}}</mat-icon>
                                      <span class="text-[8px] font-black uppercase text-slate-400 tracking-widest">Icon Fallback</span>
                                    </div>
                                  } @else {
                                    <mat-icon class="!text-3xl text-slate-200">add_photo_alternate</mat-icon>
                                  }
                                  
                                  <!-- Hover controls for image -->
                                  <div class="absolute inset-0 bg-secondary/40 flex items-center justify-center gap-3 opacity-0 group-hover/logo:opacity-100 transition-opacity backdrop-blur-[2px]">
                                    @if (brand.img) {
                                      <button (click)="selectedViewImage.set(brand.img)" class="w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-secondary rounded-lg flex items-center justify-center transition-all shadow-lg">
                                        <mat-icon class="!text-[16px]">zoom_in</mat-icon>
                                      </button>
                                    }
                                    <div class="relative w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors shadow-lg cursor-pointer">
                                      <mat-icon class="!text-[16px]">upload</mat-icon>
                                      <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', i, 'home-brand')" class="absolute inset-0 opacity-0 cursor-pointer">
                                    </div>
                                  </div>
                                </div>

                                <div class="space-y-4 pt-2">
                                  <div>
                                    <label [for]="'brand-name-' + i" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Brand Name</label>
                                    <input [id]="'brand-name-' + i" type="text" [(ngModel)]="brand.name" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner" placeholder="e.g. SOLARMAX">
                                  </div>
                                  
                                  <div class="grid grid-cols-2 gap-3">
                                    <div>
                                      <label [for]="'brand-icon-' + i" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Icon ID</label>
                                      <input [id]="'brand-icon-' + i" type="text" [(ngModel)]="brand.icon" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2 text-[10px] text-secondary outline-none opacity-60 focus:opacity-100 transition-opacity" placeholder="material_icon">
                                    </div>
                                    <div>
                                      <label [for]="'brand-img-' + i" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Image Path</label>
                                      <input [id]="'brand-img-' + i" type="text" [(ngModel)]="brand.img" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2 text-[10px] text-secondary outline-none opacity-60 focus:opacity-100 transition-opacity" placeholder="/img/logo/...">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Why Choose Us Accordion -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'features' ? '' : 'features')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'features' ? '' : 'features')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>thumb_up_alt</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Why Choose Us</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Core Values & Features</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'features'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'features') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">title</mat-icon> Section Title
                              </div>
                              <input type="text" [(ngModel)]="websiteData().home.featuresTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-black text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">subtitles</mat-icon> Section Subtitle
                              </div>
                              <input type="text" [(ngModel)]="websiteData().home.featuresSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                        </div>

                        <div class="flex justify-between items-center mb-4">
                           <p class="text-[10px] font-black text-slate-800 uppercase tracking-widst">Feature Cards</p>
                           <button mat-flat-button class="!bg-primary/10 !text-primary !font-black !rounded-xl" (click)="addHomeFeature()">
                             <mat-icon class="!text-sm">add</mat-icon> Add Feature
                           </button>
                        </div>

                        <div class="space-y-4">
                          @for (feat of websiteData().home.features; track $index; let i = $index) {
                            <div class="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative group/feat hover:shadow-md transition-all">
                              <button (click)="removeHomeFeature(i)" class="absolute top-4 right-4 text-red-500 opacity-0 group-hover/feat:opacity-100 hover:scale-110 active:scale-95 transition-all">
                                <mat-icon>cancel</mat-icon>
                              </button>
                              
                              <div class="sm:w-32 shrink-0 flex flex-col items-center gap-3">
                                <div class="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary">
                                  <mat-icon class="!text-3xl">{{websiteData().home.features[i].icon}}</mat-icon>
                                </div>
                                <div class="w-full text-center">
                                  <div class="block text-[9px] font-black text-slate-400 uppercase mb-1">Icon ID</div>
                                  <input type="text" [(ngModel)]="websiteData().home.features[i].icon" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-2 py-1 text-[10px] text-center font-bold text-secondary outline-none">
                                </div>
                              </div>
                              
                              <div class="flex-grow space-y-4">
                                <div>
                                  <div class="block text-[9px] font-black text-slate-400 uppercase mb-2">Display Title</div>
                                  <input type="text" [(ngModel)]="websiteData().home.features[i].title" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-black text-secondary outline-none focus:bg-slate-100 transition-colors" placeholder="Title">
                                </div>
                                <div>
                                   <div class="block text-[9px] font-black text-slate-400 uppercase mb-2 flex items-center justify-between">
                                     <span>Content Description</span>
                                     <span class="text-[8px] font-bold opacity-50">{{websiteData().home.features[i].desc?.length || 0}} / 200</span>
                                   </div>
                                   <textarea [(ngModel)]="websiteData().home.features[i].desc" rows="3" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none focus:bg-slate-100 transition-all resize-none"></textarea>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Portfolio Section (Accordion Style) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'portfolio' ? '' : 'portfolio')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'portfolio' ? '' : 'portfolio')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>photo_library</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Our Portfolio</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Project Showcases & Gallery</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="hidden sm:flex bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{{websiteData().home.projects?.length || 0}} Projects</div>
                        <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'portfolio'">expand_more</mat-icon>
                      </div>
                    </div>
                    
                    @if (activeAccordionSection() === 'portfolio') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
                          <div class="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
                            <button (click)="websiteData().home.portfolioDisplayFormat = 'grid'" [class.bg-white]="websiteData().home.portfolioDisplayFormat === 'grid'" [class.shadow-md]="websiteData().home.portfolioDisplayFormat === 'grid'" [class.text-primary]="websiteData().home.portfolioDisplayFormat === 'grid'" class="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Grid View</button>
                            <button (click)="websiteData().home.portfolioDisplayFormat = 'carousel'" [class.bg-white]="websiteData().home.portfolioDisplayFormat === 'carousel'" [class.shadow-md]="websiteData().home.portfolioDisplayFormat === 'carousel'" [class.text-primary]="websiteData().home.portfolioDisplayFormat === 'carousel'" class="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Carousel</button>
                          </div>
                          <button mat-flat-button class="!bg-primary !text-white !font-black !rounded-2xl !px-6 !py-6 shadow-xl shadow-primary/20 hover:scale-105 transition-transform" (click)="addHomeProject()">
                            <mat-icon>add_circle</mat-icon> New Portfolio Case
                          </button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">label</mat-icon> Section Tagline
                              </div>
                              <input type="text" [(ngModel)]="websiteData().home.portfolioTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" placeholder="e.g. Our Portfolio">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">format_quote</mat-icon> Display Title
                              </div>
                              <input type="text" [(ngModel)]="websiteData().home.projectsTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div class="md:col-span-2">
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <mat-icon class="!text-xs !w-auto !h-auto">description</mat-icon> Descriptive Context
                              </div>
                              <textarea [(ngModel)]="websiteData().home.projectsSubtitle" rows="3" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"></textarea>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8" cdkDropList (cdkDropListDropped)="dropProject($event)">
                          @for (proj of websiteData().home.projects; track $index; let i = $index) {
                            <div cdkDrag class="bg-white dark:bg-slate-800 p-2 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 relative group/proj shadow-sm hover:shadow-xl transition-all duration-500">
                              <div class="absolute top-6 right-6 z-30 flex items-center gap-2 transition-opacity translate-y-2 group-hover/proj:translate-y-0 duration-300">
                                <button mat-icon-button cdkDragHandle class="!bg-white !text-slate-400 cursor-move hover:!text-primary shadow-xl rounded-full sm:opacity-0 sm:group-hover/proj:opacity-100 transition-opacity" title="Drag to reorder">
                                  <mat-icon>drag_indicator</mat-icon>
                                </button>
                                <button mat-icon-button (click)="removeHomeProject(i)" class="!bg-rose-500 !text-white shadow-xl rounded-full hover:!bg-rose-600 sm:opacity-0 sm:group-hover/proj:opacity-100 transition-opacity" title="Delete Project">
                                  <mat-icon>delete</mat-icon>
                                </button>
                              </div>

                              <div class="flex flex-col gap-8 p-4">
                                <div class="w-full space-y-4">
                                  <div class="relative group/card rounded-[2rem] overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 aspect-video">
                                     @if (websiteData().home.projects[i].image) {
                                       <img [src]="websiteData().home.projects[i].image" class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" referrerpolicy="no-referrer" alt="project preview">
                                     } @else {
                                       <div class="flex flex-col items-center justify-center w-full h-full text-slate-300">
                                         <mat-icon class="!text-5xl !w-auto !h-auto mb-2">image</mat-icon>
                                         <span class="text-[10px] font-black uppercase tracking-widest">Main Showcase Missing</span>
                                       </div>
                                     }
                                     
                                     <!-- Content Overlay -->
                                     <div class="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent flex flex-col justify-end p-8 pointer-events-none">
                                       <div class="bg-primary/90 backdrop-blur-sm self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-2">
                                          {{websiteData().home.projects[i].systemSize || 'System Size'}}
                                       </div>
                                       <h3 class="text-2xl font-black text-white leading-tight">{{websiteData().home.projects[i].title || 'Untitled Project'}}</h3>
                                     </div>

                                     <!-- Hover Actions Overlay -->
                                     <div class="absolute inset-0 bg-secondary/60 backdrop-blur-[2px] flex items-center justify-center gap-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                                       <button (click)="selectedViewImage.set(websiteData().home.projects[i].image)" class="w-12 h-12 bg-white/20 hover:bg-white text-white hover:text-secondary rounded-2xl flex items-center justify-center transition-all shadow-2xl backdrop-blur-md">
                                         <mat-icon>visibility</mat-icon>
                                       </button>
                                       <div class="relative w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                                         <mat-icon>upload</mat-icon>
                                         <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', i, 'home-project')" class="absolute inset-0 opacity-0 cursor-pointer">
                                       </div>
                                     </div>
                                  </div>
                                  
                                  <div class="space-y-4 px-2">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div class="md:col-span-2">
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Case Study Title</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].title" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-black text-secondary outline-none focus:ring-1 focus:ring-primary transition-all">
                                      </div>
                                      <div>
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Client Name</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].client" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none">
                                      </div>
                                      <div>
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Location</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].location" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none">
                                      </div>
                                      <div>
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">System Size</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].systemSize" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none" placeholder="e.g. 5kWp On-Grid">
                                      </div>
                                      <div>
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Completion</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].completionDate" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none">
                                      </div>
                                      <div class="md:col-span-2">
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Environmental Impact</div>
                                         <input type="text" [(ngModel)]="websiteData().home.projects[i].energySaved" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-emerald-600 outline-none" placeholder="e.g. 4.2 Tons CO2 Saved/Year">
                                      </div>
                                      <div class="md:col-span-2">
                                         <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Project Narrative</div>
                                         <textarea [(ngModel)]="websiteData().home.projects[i].description" rows="4" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none"></textarea>
                                      </div>
                                    </div>

                                    <!-- Gallery Management -->
                                    <div class="pt-6 border-t border-slate-100 dark:border-slate-800 mt-2">
                                       <div class="flex items-center justify-between mb-4">
                                          <div class="flex items-center gap-2">
                                            <mat-icon class="text-slate-300 text-sm">collections</mat-icon>
                                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Extended Gallery</h5>
                                          </div>
                                          <button mat-button class="!text-primary !font-black !text-[10px] !bg-primary/5 !rounded-lg" (click)="addHomeProjectGalleryImage(i)">+ ADD PHOTO</button>
                                       </div>
                                       
                                       <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                         @for (gimg of websiteData().home.projects[i].gallery; track $index; let gIndex = $index) {
                                           <div class="relative aspect-square rounded-2xl bg-slate-50 dark:bg-slate-900 overflow-hidden border border-slate-100 dark:border-slate-800 group/gal shadow-sm">
                                              @if(gimg) {
                                                <img [src]="gimg" class="w-full h-full object-cover" alt="Gallery Photo">
                                              } @else {
                                                <div class="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                                  <mat-icon class="!text-lg">image</mat-icon>
                                                </div>
                                              }
                                              
                                              <div class="absolute inset-0 bg-secondary/60 opacity-0 group-hover/gal:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                                <button (click)="selectedViewImage.set(gimg)" class="w-8 h-8 bg-white/20 hover:bg-white text-white hover:text-secondary rounded-lg flex items-center justify-center transition-all backdrop-blur-md">
                                                  <mat-icon class="!text-[16px]">visibility</mat-icon>
                                                </button>
                                                <button (click)="removeHomeProjectGalleryImage(i, gIndex)" class="w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg">
                                                  <mat-icon class="!text-[16px]">delete</mat-icon>
                                                </button>
                                                <div class="absolute inset-0 opacity-0 cursor-pointer">
                                                   <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', i, 'home-project-gallery', gIndex)" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full">
                                                </div>
                                              </div>
                                           </div>
                                         }
                                         @if (!websiteData().home.projects[i].gallery?.length) {
                                           <div class="col-span-full py-8 text-center bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800">
                                              <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Gallery Empty</p>
                                           </div>
                                         }
                                       </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Our Expertise Content (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'expertise' ? '' : 'expertise')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'expertise' ? '' : 'expertise')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>business_center</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Our Expertise</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Nature of Business</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'expertise'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'expertise') {
                      <div class="p-6 pt-0 border-t border-slate-100 dark:border-slate-800">
                        <div class="space-y-4 pt-6">
                            <div>
                              <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Section Title</div>
                              <input type="text" [(ngModel)]="websiteData().home.businessNaturesTitle" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-secondary outline-none focus:border-primary/50 transition-colors shadow-sm">
                            </div>
                            <div>
                              <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Section Subtitle</div>
                              <textarea [(ngModel)]="websiteData().home.businessNaturesSubtitle" rows="2" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none focus:border-primary/50 transition-colors shadow-sm"></textarea>
                            </div>
                        </div>

                        <div class="mt-8">
                          <div class="flex items-center justify-between mb-4">
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expertise Items</h5>
                            <button mat-button class="!bg-primary/10 !text-primary !rounded-xl !px-4 !py-1 !font-bold !text-[10px] tracking-widest" (click)="addBusinessNature()"><mat-icon class="!text-[14px] mr-1">add</mat-icon> ADD NATUTRE OF BUSINESS</button>
                          </div>
                          
                          <div cdkDropList (cdkDropListDropped)="dropBusinessNature($event)" class="space-y-3">
                            @for (nature of websiteData().home.businessNatures; track $index; let i = $index) {
                              <div cdkDrag class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm group/item">
                                <div class="flex items-start gap-4">
                                  <div cdkDragHandle class="cursor-grab text-slate-300 hover:text-slate-500 py-2">
                                    <mat-icon>drag_indicator</mat-icon>
                                  </div>
                                  <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Category / Type</div>
                                      <input type="text" [(ngModel)]="websiteData().home.businessNatures[i].category" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors" placeholder="e.g. Contracting">
                                    </div>
                                    <div>
                                      <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Title</div>
                                      <input type="text" [(ngModel)]="websiteData().home.businessNatures[i].title" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors">
                                    </div>
                                    <div>
                                      <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Material Icon Name</div>
                                      <div class="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3">
                                        <mat-icon class="text-primary text-sm">{{websiteData().home.businessNatures[i].icon}}</mat-icon>
                                        <input type="text" [(ngModel)]="websiteData().home.businessNatures[i].icon" class="w-full bg-transparent text-sm text-secondary outline-none" placeholder="e.g. electrical_services">
                                      </div>
                                    </div>
                                    <div class="md:col-span-2">
                                      <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Description</div>
                                      <textarea [(ngModel)]="websiteData().home.businessNatures[i].desc" rows="2" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none focus:bg-white text-left transition-colors"></textarea>
                                    </div>
                                  </div>
                                  <button (click)="removeBusinessNature(i)" class="w-10 h-10 flex-shrink-0 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors self-start opacity-0 group-hover/item:opacity-100 focus:opacity-100">
                                    <mat-icon>delete</mat-icon>
                                  </button>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Promotional Video Content (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'video' ? '' : 'video')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'video' ? '' : 'video')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>play_circle</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Promotional Video</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Video MP4 & Live Stats</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'video'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'video') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="md:col-span-2">
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <mat-icon class="!text-xs !w-auto !h-auto">link</mat-icon> Source URL (.mp4)
                            </div>
                            <input type="text" [(ngModel)]="websiteData().home.videoUrl" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Section Headline</div>
                            <input type="text" [(ngModel)]="websiteData().home.videoTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Narrative Content</div>
                            <textarea [(ngModel)]="websiteData().home.videoDescription" rows="3" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"></textarea>
                          </div>
                          <div class="md:col-span-2 mt-4">
                            <div class="flex items-center justify-between mb-4">
                               <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest border-l-4 border-primary pl-3">Real-time Statistics</h5>
                               <button mat-flat-button class="!bg-primary/10 !text-primary !font-black !text-[10px] !rounded-xl" (click)="addVideoStat()">+ ADD COUNTER</button>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              @for (stat of websiteData().home.videoStats; track $index; let i = $index) {
                                <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative group/stat shadow-sm">
                                  <button (click)="removeVideoStat(i)" class="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/stat:opacity-100 transition-opacity shadow-lg">
                                    <mat-icon class="!text-xs">close</mat-icon>
                                  </button>
                                  <div class="space-y-3">
                                    <div>
                                      <div class="block text-[8px] font-black text-slate-400 uppercase mb-1">Value</div>
                                      <input type="text" [(ngModel)]="stat.value" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-black text-primary outline-none">
                                    </div>
                                    <div>
                                      <div class="block text-[8px] font-black text-slate-400 uppercase mb-1">Label</div>
                                      <input type="text" [(ngModel)]="stat.label" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-500 outline-none">
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Testimonials Section (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'testimonials' ? '' : 'testimonials')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'testimonials' ? '' : 'testimonials')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>reviews</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Testimonials</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Customer Reviews & Peer Proof</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'testimonials'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'testimonials') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
                           <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                              <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Display Headline</div>
                                <input type="text" [(ngModel)]="websiteData().home.testimonialsTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-black text-secondary shadow-sm outline-none">
                              </div>
                              <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contextual Subline</div>
                                <input type="text" [(ngModel)]="websiteData().home.testimonialsSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-600 shadow-sm outline-none">
                              </div>
                           </div>
                           <button mat-flat-button class="!bg-primary !text-white !font-black !rounded-2xl !px-6 !py-6 shadow-xl shadow-primary/20 transition-all hover:scale-105" (click)="addTestimonial()">
                             <mat-icon>add_circle</mat-icon> New Testimonial
                           </button>
                        </div>
                        
                        <div class="grid grid-cols-1 gap-6">
                          @for (item of websiteData().home.testimonials; track $index; let i = $index) {
                            <div class="group/test bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 relative shadow-sm hover:shadow-xl transition-all duration-500">
                              <button (click)="removeTestimonial(i)" class="absolute top-6 right-6 w-10 h-10 bg-rose-500 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover/test:opacity-100 transition-all translate-y-2 group-hover/test:translate-y-0 shadow-xl z-10">
                                 <mat-icon>delete</mat-icon>
                              </button>
                              
                              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div class="lg:col-span-3 flex flex-col items-center gap-4">
                                   <div class="relative w-24 h-24 rounded-[1.5rem] bg-slate-100 dark:bg-slate-900 border-2 border-white dark:border-slate-700 overflow-hidden group/avatar shadow-lg rotate-3 group-hover/test:rotate-0 transition-transform duration-500">
                                      <img [src]="item.image" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="Testimonial Avatar">
                                      <div class="absolute inset-0 bg-secondary/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                        <mat-icon class="text-white">upload</mat-icon>
                                        <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', i, 'testimonial')" class="absolute inset-0 opacity-0 cursor-pointer">
                                      </div>
                                   </div>
                                   <div class="w-full">
                                      <div class="block text-[8px] font-black text-slate-400 uppercase text-center mb-1">Avatar Source URL</div>
                                      <input type="text" [(ngModel)]="item.image" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-1.5 text-[10px] text-slate-400 text-center outline-none">
                                   </div>
                                </div>
                                
                                <div class="lg:col-span-9 space-y-6">
                                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                       <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Customer Identity</div>
                                       <input type="text" [(ngModel)]="item.name" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-black text-secondary outline-none focus:ring-1 focus:ring-primary transition-all">
                                    </div>
                                    <div>
                                       <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Role / Location Context</div>
                                       <input type="text" [(ngModel)]="item.role" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-500 outline-none">
                                    </div>
                                  </div>
                                  <div>
                                     <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">The Verification Quote</div>
                                     <textarea [(ngModel)]="item.quote" rows="4" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.25rem] px-5 py-4 text-sm font-medium text-slate-600 outline-none focus:ring-1 focus:ring-primary transition-all resize-none shadow-inner"></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Global CTA (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'cta' ? '' : 'cta')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'cta' ? '' : 'cta')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>campaign</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Call to Action</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Global Conversion Banner</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'cta'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'cta') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="md:col-span-2">
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Headline Trigger</div>
                             <input type="text" [(ngModel)]="websiteData().home.ctaTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" placeholder="e.g. Ready to Power Your Future?">
                          </div>
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Encouraging Narrative</div>
                             <textarea [(ngModel)]="websiteData().home.ctaSubtitle" rows="4" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"></textarea>
                          </div>
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Button Label</div>
                             <input type="text" [(ngModel)]="websiteData().home.ctaButtonText" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                             
                             <div class="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                               <mat-icon class="text-primary mt-0.5">info</mat-icon>
                               <div class="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                                 The CTA section is a global component designed to drive conversions. Use strong action verbs for the button and headline.
                               </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Proposal & Social Proof (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'proof' ? '' : 'proof')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'proof' ? '' : 'proof')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>verified</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Social Proof & Proposals</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Trust Markers & Ratings</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'proof'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'proof') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Rating Value</div>
                            <input type="text" [(ngModel)]="websiteData().home.ratingValue" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm">
                          </div>
                          <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Rating Label</div>
                            <input type="text" [(ngModel)]="websiteData().home.ratingLabel" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-600 shadow-sm">
                          </div>
                          <div class="md:col-span-2 space-y-4">
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">Proposal Disclaimer Block</h5>
                            <input type="text" [(ngModel)]="websiteData().home.proposalTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm" placeholder="Proposal Title">
                            <textarea [(ngModel)]="websiteData().home.proposalSubtitle" rows="2" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 resize-none shadow-sm"></textarea>
                            <input type="text" [(ngModel)]="websiteData().home.proposalButtonText" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold text-primary shadow-sm" placeholder="Button Text">
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Typography & Styling (Accordion) -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'styles' ? '' : 'styles')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'styles' ? '' : 'styles')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>format_paint</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Typography & Theme</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Fonts, Sizes & Colors</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'styles'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'styles') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Font Families</h5>
                            <div class="space-y-4">
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">Sans Serif (UI)</div>
                                <input type="text" [(ngModel)]="websiteData().typography.fontSans" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner">
                              </div>
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">Display (Heads)</div>
                                <input type="text" [(ngModel)]="websiteData().typography.fontDisplay" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner">
                              </div>
                            </div>
                            
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-6 mb-4">Header Sizes (Tailwind Scale)</h5>
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">H1 Size</div>
                                <input type="text" [(ngModel)]="websiteData().typography.h1Size" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner" placeholder="e.g. 5xl">
                              </div>
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">H2 Size</div>
                                <input type="text" [(ngModel)]="websiteData().typography.h2Size" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner" placeholder="e.g. 3xl">
                              </div>
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">H3 Size</div>
                                <input type="text" [(ngModel)]="websiteData().typography.h3Size" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner" placeholder="e.g. 2xl">
                              </div>
                              <div>
                                <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">H4 Size</div>
                                <input type="text" [(ngModel)]="websiteData().typography.h4Size" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm shadow-inner" placeholder="e.g. xl">
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Primary Theme Colors</h5>
                            <div class="grid grid-cols-1 gap-4">
                              <div class="flex items-center gap-4">
                                <input type="color" [(ngModel)]="websiteData().theme.primary" class="w-12 h-12 rounded-xl cursor-pointer border-none bg-transparent">
                                <div class="flex-grow">
                                  <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">Primary Color</div>
                                  <input type="text" [(ngModel)]="websiteData().theme.primary" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-mono shadow-sm">
                                </div>
                              </div>
                              <div class="flex items-center gap-4">
                                <input type="color" [(ngModel)]="websiteData().theme.secondary" class="w-12 h-12 rounded-xl cursor-pointer border-none bg-transparent">
                                <div class="flex-grow">
                                  <div class="block text-[9px] font-black text-slate-400 uppercase mb-1 px-1">Secondary Color</div>
                                  <input type="text" [(ngModel)]="websiteData().theme.secondary" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-mono shadow-sm">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'services') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">handyman</mat-icon> 
                       Services Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Global Page Elements & Secondary Content</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Header Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'serv-header' ? '' : 'serv-header')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'serv-header' ? '' : 'serv-header')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>view_day</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Banner & Header</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Page Hero & Title</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'serv-header'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'serv-header') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto">image</mat-icon> Banner Background Image
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner">
                                 <img [src]="websiteData().services.bannerImage" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="banner preview">
                                 @if (websiteData().services.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().services.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().services.bannerImage" placeholder="Enter remote image URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'services')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Display Header Title</div>
                                <input type="text" [(ngModel)]="websiteData().services.headerTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Supporting Header Subtitle</div>
                                <input type="text" [(ngModel)]="websiteData().services.headerSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Secondary Content Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'serv-secondary' ? '' : 'serv-secondary')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'serv-secondary' ? '' : 'serv-secondary')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>wrap_text</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Secondary Narrative</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Detailed Service Context</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'serv-secondary'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'serv-secondary') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-6">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 text-primary flex items-center gap-2">
                                <mat-icon class="!text-xs">star</mat-icon> Feature Title
                              </div>
                              <input type="text" [(ngModel)]="websiteData().services.secondaryTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Detailed Narrative Content</div>
                              <textarea [(ngModel)]="websiteData().services.secondaryDescription" rows="5" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none leading-relaxed"></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Service Details Editor -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'serv-details' ? '' : 'serv-details')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'serv-details' ? '' : 'serv-details')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>list_alt</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Service Detail Pages</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Edit specific service page content</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'serv-details'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'serv-details') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-6">
                           <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Select Service to Edit</div>
                              <select [(ngModel)]="selectedServiceDetailId" (change)="selectedServiceDetailId.set($any($event.target).value)" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                                <option value="solar-installation">Solar PV Systems</option>
                                <option value="electrical-works">Electrical Contracting</option>
                                <option value="telecom-projects">Telecom Projects</option>
                                <option value="ups-systems">UPS Systems</option>
                                <option value="air-conditioning">Air Conditioning Systems</option>
                                <option value="construction-renovation">Construction & Renovation</option>
                              </select>
                           </div>

                           @if (websiteData().services.serviceDetails[selectedServiceDetailId()]) {
                             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Service Title</div>
                                    <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].title" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                                </div>
                                <div>
                                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Material Icon</div>
                                    <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].icon" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                                </div>
                                <div class="md:col-span-2">
                                  <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Long Description</div>
                                  <textarea [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].longDescription" rows="3" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"></textarea>
                                </div>
                                <div class="md:col-span-2">
                                  <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Featured Image URL</div>
                                  <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].image" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                                </div>
                             </div>

                             <div class="mt-8 space-y-8">
                               <div>
                                 <div class="flex items-center justify-between mb-4">
                                   <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Benefits</h5>
                                   <button mat-button class="!bg-primary/10 !text-primary !rounded-xl !px-4 !py-1 !font-bold !text-[10px] tracking-widest" (click)="addServiceBenefit()"><mat-icon class="!text-[14px] mr-1">add</mat-icon> ADD BENEFIT</button>
                                 </div>
                                 <div class="space-y-3">
                                   @for (benefit of websiteData().services.serviceDetails[selectedServiceDetailId()].benefits; track $index; let i = $index) {
                                     <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm group/item flex items-start gap-4">
                                       <div class="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Benefit Title</div>
                                            <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].benefits[i].title" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors">
                                         </div>
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Icon Name</div>
                                            <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].benefits[i].icon" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors">
                                         </div>
                                         <div class="sm:col-span-2">
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Description</div>
                                            <textarea [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].benefits[i].desc" rows="2" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none focus:bg-white transition-colors"></textarea>
                                         </div>
                                       </div>
                                       <button (click)="removeServiceBenefit(i)" class="w-10 h-10 flex-shrink-0 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors self-start">
                                         <mat-icon>delete</mat-icon>
                                       </button>
                                     </div>
                                   }
                                 </div>
                               </div>

                               <div>
                                 <div class="flex items-center justify-between mb-4">
                                   <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Process Steps</h5>
                                   <button mat-button class="!bg-primary/10 !text-primary !rounded-xl !px-4 !py-1 !font-bold !text-[10px] tracking-widest" (click)="addDetailProcess()"><mat-icon class="!text-[14px] mr-1">add</mat-icon> ADD STEP</button>
                                 </div>
                                 <div class="space-y-3">
                                   @for (step of websiteData().services.serviceDetails[selectedServiceDetailId()].process; track $index; let i = $index) {
                                     <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm group/item flex items-start gap-4">
                                       <div class="flex-grow space-y-4">
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Step Title</div>
                                            <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].process[i].title" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors">
                                         </div>
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Description</div>
                                            <textarea [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].process[i].desc" rows="2" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none focus:bg-white transition-colors"></textarea>
                                         </div>
                                       </div>
                                       <button (click)="removeDetailProcess(i)" class="w-10 h-10 flex-shrink-0 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors self-start">
                                         <mat-icon>delete</mat-icon>
                                       </button>
                                     </div>
                                   }
                                 </div>
                               </div>

                               <div>
                                 <div class="flex items-center justify-between mb-4">
                                   <h5 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">FAQs</h5>
                                   <button mat-button class="!bg-primary/10 !text-primary !rounded-xl !px-4 !py-1 !font-bold !text-[10px] tracking-widest" (click)="addServiceFaq()"><mat-icon class="!text-[14px] mr-1">add</mat-icon> ADD FAQ</button>
                                 </div>
                                 <div class="space-y-3">
                                   @for (faq of websiteData().services.serviceDetails[selectedServiceDetailId()].faqs; track $index; let i = $index) {
                                     <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm group/item flex items-start gap-4">
                                       <div class="flex-grow space-y-4">
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Question</div>
                                            <input type="text" [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].faqs[i].q" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:bg-white transition-colors">
                                         </div>
                                         <div>
                                            <div class="block text-[9px] font-black text-slate-400 uppercase mb-1.5 px-1">Answer</div>
                                            <textarea [(ngModel)]="websiteData().services.serviceDetails[selectedServiceDetailId()].faqs[i].a" rows="2" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none resize-none focus:bg-white transition-colors"></textarea>
                                         </div>
                                       </div>
                                       <button (click)="removeServiceFaq(i)" class="w-10 h-10 flex-shrink-0 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors self-start">
                                         <mat-icon>delete</mat-icon>
                                       </button>
                                     </div>
                                   }
                                 </div>
                               </div>

                             </div>
                           }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'products') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">inventory_2</mat-icon> 
                       Products Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Main Landing & Collections Elements</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Header Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'prod-header' ? '' : 'prod-header')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'prod-header' ? '' : 'prod-header')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                          <mat-icon>branding_watermark</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Banner & Header</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Landing Hero Configuration</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'prod-header'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'prod-header') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto">landscape</mat-icon> Hero Background Image
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-video rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner">
                                 <img [src]="websiteData().products.bannerImage" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="banner preview">
                                 @if (websiteData().products.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().products.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().products.bannerImage" placeholder="Enter remote image URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'products')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Landing Title</div>
                                <input type="text" [(ngModel)]="websiteData().products.headerTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Landing Context / Subtitle</div>
                                <input type="text" [(ngModel)]="websiteData().products.headerSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-600 focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm">
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'about') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">info</mat-icon> 
                       About Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Brand Discovery & Identity Settings</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Header Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'about-header' ? '' : 'about-header')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'about-header' ? '' : 'about-header')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>art_track</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Banner & Header</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Hero Intro Configuration</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'about-header'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'about-header') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto">image</mat-icon> Main Introduction Image
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner">
                                 <img [src]="websiteData().about.bannerImage" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="banner preview">
                                 @if (websiteData().about.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().about.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().about.bannerImage" placeholder="Enter image URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'about')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 text-primary">Display Headline</div>
                                <input type="text" [(ngModel)]="websiteData().about.headerTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Contextual Subheader</div>
                                <input type="text" [(ngModel)]="websiteData().about.headerSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-500 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Our Story Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'about-story' ? '' : 'about-story')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'about-story' ? '' : 'about-story')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>history_edu</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Our Story</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">The Blucid Origins & Journey</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'about-story'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'about-story') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-6">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Story Section Title</div>
                              <input type="text" [(ngModel)]="websiteData().about.storyTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Foundational Narrative</div>
                              <textarea [(ngModel)]="websiteData().about.storyParagraph" rows="6" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none leading-relaxed"></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Mission & Vision Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'about-philosophy' ? '' : 'about-philosophy')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'about-philosophy' ? '' : 'about-philosophy')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>stars</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Philosophy</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Mission, Vision & Core Values</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'about-philosophy'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'about-philosophy') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                <mat-icon class="text-primary !text-sm">flag</mat-icon> Mission Statement
                              </div>
                              <textarea [(ngModel)]="websiteData().about.mission" rows="6" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none leading-relaxed"></textarea>
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                <mat-icon class="text-primary !text-sm">visibility</mat-icon> Future Vision
                              </div>
                              <textarea [(ngModel)]="websiteData().about.vision" rows="6" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none leading-relaxed"></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'contact') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">contact_support</mat-icon> 
                       Contact Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Connectability & Logistics Elements</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Header Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'cont-header' ? '' : 'cont-header')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'cont-header' ? '' : 'cont-header')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>alternate_email</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Banner & Header</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Introduction & Visuals</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'cont-header'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'cont-header') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto">image</mat-icon> Page Banner Graphic
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner">
                                 <img [src]="websiteData().contact.bannerImage" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="banner preview">
                                 @if (websiteData().contact.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().contact.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().contact.bannerImage" placeholder="Enter image URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'contact')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Main Page Title</div>
                                <input type="text" [(ngModel)]="websiteData().contact.headerTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Friendly Greeting / Subtitle</div>
                                <input type="text" [(ngModel)]="websiteData().contact.headerSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-500 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Core Contact Info Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'cont-core' ? '' : 'cont-core')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'cont-core' ? '' : 'cont-core')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>business</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Branch Info</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Physical Location & Primary Contacts</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'cont-core'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'cont-core') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                                <mat-icon class="!text-sm text-primary">location_on</mat-icon> Registered Address
                              </div>
                              <input type="text" [(ngModel)]="websiteData().contact.address" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                                <mat-icon class="!text-sm text-primary">mail</mat-icon> Professional Email
                              </div>
                              <input type="email" [(ngModel)]="websiteData().contact.email" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                                <mat-icon class="!text-sm text-primary">phone_iphone</mat-icon> Support Hotline
                              </div>
                              <input type="tel" [(ngModel)]="websiteData().contact.phone" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Office Details & Hours Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'cont-details' ? '' : 'cont-details')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'cont-details' ? '' : 'cont-details')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>schedule</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Operations</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Working Hours & Form Headers</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'cont-details'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'cont-details') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Form Section Title</div>
                              <input type="text" [(ngModel)]="websiteData().contact.formTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Office Section Title</div>
                              <input type="text" [(ngModel)]="websiteData().contact.officeTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                        </div>
                        <div>
                            <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 flex items-center justify-between">
                              <span>Working Hours & Schedule Narrative</span>
                              <mat-icon class="!text-[10px] !w-auto !h-auto text-slate-300">event_available</mat-icon>
                            </div>
                            <input type="text" [(ngModel)]="websiteData().contact.workingHours" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 text-sm text-slate-600 shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. MON to FRI at 8:00 AM - 5:00 PM">
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Support & Custom Methods Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'cont-methods' ? '' : 'cont-methods')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'cont-methods' ? '' : 'cont-methods')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>hub</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Secondary Connections</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Social Networks & Custom Links</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="hidden sm:flex bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{{websiteData().contact.contactMethods?.length || 0}} Links</div>
                        <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'cont-methods'">expand_more</mat-icon>
                      </div>
                    </div>

                    @if (activeAccordionSection() === 'cont-methods') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="flex justify-between items-center mb-6">
                           <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Connectability Cards</p>
                           <button mat-flat-button class="!bg-primary/10 !text-primary !font-black !rounded-xl" (click)="addContactMethod()">
                             <mat-icon class="!text-sm">add</mat-icon> Add Link
                           </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          @for (method of websiteData().contact.contactMethods; track $index; let i = $index) {
                            <div class="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative group/method hover:border-primary/20 transition-all">
                              <button (click)="removeContactMethod(i)" class="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover/method:opacity-100 transition-all shadow-lg hover:scale-110 active:scale-95">
                                <mat-icon class="!text-xs">close</mat-icon>
                              </button>
                              
                              <div class="w-full sm:w-1/3">
                                <div class="block text-[8px] font-black text-slate-400 uppercase mb-1 px-1">Network Label</div>
                                <input type="text" [(ngModel)]="websiteData().contact.contactMethods[i].label" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-black text-secondary outline-none focus:bg-white transition-colors">
                              </div>
                              <div class="flex-grow">
                                <div class="block text-[8px] font-black text-slate-400 uppercase mb-1 px-1">URL / Handle / ID</div>
                                <input type="text" [(ngModel)]="websiteData().contact.contactMethods[i].value" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-500 outline-none focus:bg-white transition-colors">
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'faq') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">quiz</mat-icon> 
                       FAQ Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Help Center & Self-Service Content</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Header Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'faq-header' ? '' : 'faq-header')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'faq-header' ? '' : 'faq-header')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>help_outline</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Banner & Header</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Intro Narrative & Visuals</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'faq-header'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'faq-header') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto">image</mat-icon> Help Center Banner Image
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner">
                                 <img [src]="websiteData().faq.bannerImage" class="w-full h-full object-cover" referrerpolicy="no-referrer" alt="banner preview">
                                 @if (websiteData().faq.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().faq.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().faq.bannerImage" placeholder="Enter remote image URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'faq')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1 text-primary">Support Title</div>
                                <input type="text" [(ngModel)]="websiteData().faq.headerTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                            <div>
                                <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Subtitle / Context</div>
                                <input type="text" [(ngModel)]="websiteData().faq.headerSubtitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm text-slate-500 outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- FAQ List Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'faq-list' ? '' : 'faq-list')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'faq-list' ? '' : 'faq-list')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>live_help</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Knowledge Base</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Questions & Answers Management</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="hidden sm:flex bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{{websiteData().faq.questions?.length || 0}} Items</div>
                        <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'faq-list'">expand_more</mat-icon>
                      </div>
                    </div>

                    @if (activeAccordionSection() === 'faq-list') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        
                        <div class="flex justify-between items-center mb-8">
                           <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest">Entry Catalog</p>
                           <button mat-flat-button class="!bg-primary/10 !text-primary !font-black !rounded-xl" (click)="addFaqItem()">
                             <mat-icon class="!text-sm">add_box</mat-icon> New FAQ Entry
                           </button>
                        </div>

                        <div class="space-y-6">
                          @for (item of websiteData().faq.questions; track $index; let i = $index) {
                            <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative group/faq hover:border-primary/20 transition-all">
                              <button (click)="removeFaqItem(i)" class="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover/faq:opacity-100 transition-all shadow-xl hover:scale-110">
                                <mat-icon class="!text-xs">delete</mat-icon>
                              </button>
                              <div class="space-y-4">
                                <div>
                                   <div class="block text-[10px] font-black text-slate-400 uppercase mb-2 px-1 flex items-center gap-2">
                                     <span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> The Question
                                   </div>
                                   <input type="text" [(ngModel)]="websiteData().faq.questions[i].q" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary outline-none focus:bg-white transition-all">
                                </div>
                                <div>
                                   <div class="block text-[10px] font-black text-slate-400 uppercase mb-2 px-1">Detailed Explanation</div>
                                   <textarea [(ngModel)]="websiteData().faq.questions[i].a" rows="3" class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-slate-600 outline-none focus:bg-white transition-all resize-none"></textarea>
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>

                  <!-- FAQ CTA Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'faq-cta' ? '' : 'faq-cta')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'faq-cta' ? '' : 'faq-cta')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>support_agent</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Assistance Callout</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Secondary Support Options</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'faq-cta'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'faq-cta') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div class="md:col-span-1">
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">CTA Headline</div>
                              <input type="text" [(ngModel)]="websiteData().faq.ctaTitle" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-secondary outline-none shadow-sm">
                          </div>
                          <div class="md:col-span-1">
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Direct Phone/Link</div>
                              <input type="text" [(ngModel)]="websiteData().faq.ctaPhone" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-black text-primary outline-none shadow-sm">
                          </div>
                          <div class="md:col-span-full mt-2">
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Supporting Narrative</div>
                              <textarea [(ngModel)]="websiteData().faq.ctaDescription" rows="3" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none shadow-sm resize-none"></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              @if (activeWebsiteTab() === 'footer') {
                <div class="flex items-center justify-between mb-8">
                  <div>
                    <h3 class="text-xl md:text-2xl font-black text-secondary dark:text-white flex items-center gap-2">
                       <mat-icon class="text-primary !w-8 !h-8 !text-[32px] leading-[32px]">footer</mat-icon> 
                       Footer Configuration
                    </h3>
                    <p class="text-slate-800 text-xs mt-1 font-bold uppercase tracking-widest">Global Persistent Elements & Identity</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Brand Identity Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'foot-brand' ? '' : 'foot-brand')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'foot-brand' ? '' : 'foot-brand')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>stars</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Brand Identity</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Logo URL & Company Brief</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'foot-brand'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'foot-brand') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="space-y-8">
                          <div>
                             <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                               <mat-icon class="!text-xs !w-auto !h-auto text-primary">token</mat-icon> Secondary Footer Logo
                             </div>
                             <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                               <div class="relative w-full sm:w-24 aspect-square rounded-xl bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0 shadow-inner group/banner flex items-center justify-center">
                                 <img [src]="websiteData().footer.bannerImage" class="max-w-[70%] max-h-[70%] object-contain" referrerpolicy="no-referrer" alt="footer logo preview">
                                 @if (websiteData().footer.bannerImage) {
                                   <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/banner:opacity-100 transition-opacity">
                                     <button (click)="websiteData().footer.bannerImage = ''" class="w-8 h-8 flex items-center justify-center bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-xl">
                                       <mat-icon class="!text-sm">delete</mat-icon>
                                     </button>
                                   </div>
                                 }
                               </div>
                               <div class="flex-grow w-full space-y-3">
                                 <div class="flex gap-2">
                                   <input type="text" [(ngModel)]="websiteData().footer.bannerImage" placeholder="Enter remote URL..." class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                   <button mat-flat-button class="!bg-primary !text-white !font-bold !rounded-xl !h-[46px] shrink-0 relative overflow-hidden px-6">
                                     <span class="flex items-center gap-2 whitespace-nowrap"><mat-icon class="!text-[18px]">upload</mat-icon> Browse</span>
                                     <input type="file" accept="image/*" (change)="onImageUpload($event, 'website', 0, 'footer')" class="absolute inset-0 opacity-0 cursor-pointer">
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Elevator Pitch / Brief Description</div>
                              <textarea [(ngModel)]="websiteData().footer.description" rows="4" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none shadow-sm resize-none focus:ring-2 focus:ring-primary/20 transition-all"></textarea>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Quick Contact Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'foot-contact' ? '' : 'foot-contact')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'foot-contact' ? '' : 'foot-contact')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>import_contacts</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Quick Contact</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Footer-Specific Address & Phone</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'foot-contact'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'foot-contact') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                <mat-icon class="!text-sm text-primary">place</mat-icon> Simplified Address
                              </div>
                              <input type="text" [(ngModel)]="websiteData().footer.address" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-black text-secondary outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                                <mat-icon class="!text-sm text-primary">phone</mat-icon> Contact Identifier
                              </div>
                              <input type="text" [(ngModel)]="websiteData().footer.phone" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-black text-secondary outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Schedule & Legal Section -->
                  <div class="group/section bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:border-primary/20">
                    <div class="flex items-center justify-between p-6 cursor-pointer select-none" (click)="activeAccordionSection.set(activeAccordionSection() === 'foot-legal' ? '' : 'foot-legal')" (keydown.enter)="activeAccordionSection.set(activeAccordionSection() === 'foot-legal' ? '' : 'foot-legal')" tabindex="0" role="button">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm group-hover/section:scale-110 transition-transform duration-500">
                           <mat-icon>gavel</mat-icon>
                        </div>
                        <div>
                          <h4 class="text-lg font-black text-secondary dark:text-white leading-tight">Hours & Legal</h4>
                          <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Schedule & Copyright Narrative</p>
                        </div>
                      </div>
                      <mat-icon class="text-slate-300 transition-transform duration-500" [class.rotate-180]="activeAccordionSection() === 'foot-legal'">expand_more</mat-icon>
                    </div>

                    @if (activeAccordionSection() === 'foot-legal') {
                      <div class="px-6 pb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div class="h-px bg-slate-200 dark:bg-slate-800 mb-8"></div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Compact Operations Schedule</div>
                              <input type="text" [(ngModel)]="websiteData().footer.schedule" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-600 outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 08:00 - 18:00 MON-SUN">
                          </div>
                          <div>
                              <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Copyright Signature</div>
                              <input type="text" [(ngModel)]="websiteData().footer.copyright" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-slate-400 outline-none shadow-sm focus:ring-2 focus:ring-primary/20 transition-all">
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <div [class.hidden]="activeSection() !== 'profile'">
            <div class="mb-8 flex flex-col items-start gap-4 pl-1">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Admin Profile</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Manage your personal information and security credentials</p>
              </div>
            </div>
            
            <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-xs p-6 md:p-8">
              <div class="flex flex-col md:flex-row gap-8 items-start">
                <div class="flex flex-col items-center gap-6 w-full md:w-auto shrink-0">
                  <div class="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center text-5xl font-bold text-slate-400 border-[6px] border-white shadow-2xl relative group overflow-hidden">
                    @if (adminProfile().avatarImage) {
                      <img [src]="adminProfile().avatarImage" class="w-full h-full object-cover" alt="Admin Avatar">
                    } @else {
                      {{ adminProfile().avatar }}
                    }
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <mat-icon class="text-white !text-3xl">photo_camera</mat-icon>
                      <input type="file" accept="image/*" (change)="onImageUpload($event, 'admin-avatar')" class="absolute inset-0 opacity-0 cursor-pointer">
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-bold text-secondary">{{ adminProfile().name }}</h3>
                    <span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest mt-2 block border border-primary/20">{{ adminProfile().role }}</span>
                  </div>
                </div>
                
                <div class="flex-grow w-full space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Display Name</div>
                      <input type="text" [(ngModel)]="adminProfile().name" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                    </div>
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</div>
                      <input type="email" [(ngModel)]="adminProfile().email" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                    </div>
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Account Password</div>
                      <div class="relative">
                        <input type="password" [(ngModel)]="adminProfile().password" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                        <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">lock</mat-icon>
                      </div>
                    </div>
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mobile Number</div>
                      <input type="tel" [(ngModel)]="adminProfile().phone" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm">
                    </div>
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Company Entity</div>
                      <input type="text" [(ngModel)]="adminProfile().company" disabled class="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-400 focus:outline-none cursor-not-allowed shadow-inner">
                    </div>
                    <div>
                      <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Profile Initial</div>
                      <input type="text" maxlength="2" [(ngModel)]="adminProfile().avatar" class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm uppercase">
                    </div>
                  </div>
                  
                  <div class="pt-6 border-t border-slate-100 flex justify-end">
                     <button mat-flat-button (click)="saveAdminProfile()" class="!rounded-2xl !bg-primary !text-white !font-bold !px-10 !py-6 shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                       Update Critical Profile
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div [class.hidden]="activeSection() !== 'inquiries'">
            <div class="mb-8 flex flex-col items-start gap-4 pl-1">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">Website Customer Inquiries</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Review and respond to quote requests submitted from the website</p>
              </div>
            </div>

            <div class="bg-white rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-xs mb-8">
              <div class="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between gap-4">
                <input type="text" [ngModel]="inquiryFilter()" (ngModelChange)="inquiryFilter.set($event)" placeholder="Search inquiries..." class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64">
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50/50 border-b border-slate-100">
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="inquirySort.set({key: 'customerName', direction: inquirySort()?.key === 'customerName' && inquirySort()?.direction === 'asc' ? 'desc' : 'asc'})">Customer</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="inquirySort.set({key: 'productName', direction: inquirySort()?.key === 'productName' && inquirySort()?.direction === 'asc' ? 'desc' : 'asc'})">Product / Service</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="inquirySort.set({key: 'createdAt', direction: inquirySort()?.key === 'createdAt' && inquirySort()?.direction === 'asc' ? 'desc' : 'asc'})">Date Received</th>
                      <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary" (click)="inquirySort.set({key: 'status', direction: inquirySort()?.key === 'status' && inquirySort()?.direction === 'asc' ? 'desc' : 'asc'})">Status</th>
                      <th class="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50">
                    @for (inquiry of filteredInquiries(); track inquiry.id) {
                      <tr class="group hover:bg-slate-50 transition-colors cursor-pointer" (click)="viewInquiryDetails(inquiry)">
                        <td class="px-8 py-5">
                          <div class="flex items-center gap-3">
                            @if (inquiry.status === 'new') {
                              <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
                            }
                            <div class="flex flex-col">
                              <span class="font-bold text-secondary text-sm flex items-center gap-2">
                                {{inquiry.customerName}}
                                @if (inquiry.status === 'new') {
                                  <span class="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tight leading-none border border-primary/20">NEW</span>
                                }
                              </span>
                              <span class="text-xs text-slate-400">{{inquiry.email}}</span>
                            </div>
                          </div>
                        </td>
                        <td class="px-8 py-5">
                           <span class="text-sm font-medium text-slate-600">{{inquiry.productName}}</span>
                        </td>
                        <td class="px-8 py-5 text-sm text-slate-500 font-medium">{{inquiry.createdAt | date:'mediumDate'}}</td>
                        <td class="px-8 py-5">
                           <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" 
                             [class]="inquiry.status === 'new' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'">
                             {{inquiry.status}}
                           </span>
                        </td>
                        <td class="px-8 py-5 text-right">
                          <button mat-icon-button [matMenuTriggerFor]="inquiryMenu" class="text-slate-400 hover:text-primary">
                            <mat-icon>more_vert</mat-icon>
                          </button>
                          <mat-menu #inquiryMenu="matMenu" class="!rounded-2xl !overflow-hidden">
                            <button mat-menu-item (click)="viewInquiryDetails(inquiry)">
                              <mat-icon class="text-blue-500">visibility</mat-icon>
                              <span>View Details</span>
                            </button>
                            <button mat-menu-item (click)="updateInquiryStatus(inquiry, 'replied')">
                              <mat-icon class="text-emerald-500">done_all</mat-icon>
                              <span>Mark as Replied</span>
                            </button>
                            <button mat-menu-item (click)="deleteInquiry(inquiry)">
                              <mat-icon class="text-red-500">delete</mat-icon>
                              <span>Delete Inquiry</span>
                            </button>
                          </mat-menu>
                        </td>
                      </tr>
                    }
                    @if (filteredInquiries().length === 0) {
                      <tr>
                        <td colspan="5" class="px-8 py-20 text-center">
                          <div class="flex flex-col items-center">
                            <mat-icon class="!w-16 !h-16 !text-[64px] text-slate-100 mb-4">mail_outline</mat-icon>
                            <p class="text-slate-800 font-bold">No customer inquiries found.</p>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div [class.hidden]="activeSection() !== 'settings'">
            <div class="mb-8 flex flex-col items-start gap-4 pl-1">
              <div>
                <h1 class="text-3xl font-display font-black text-secondary leading-tight">System Settings</h1>
                <p class="text-slate-800 text-sm mt-1 font-medium">Configure global application infrastructure and preferences</p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <!-- General Configuration -->
              <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-xs p-8">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shadow-sm">
                    <mat-icon>settings_suggest</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-secondary">General Preference</h3>
                    <p class="text-xs text-slate-800 uppercase tracking-widest font-black mt-1">Global UX & Interface</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Preference Item 1: Theme -->
                  <div class="flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm">
                          <mat-icon>{{ isDarkMode() ? 'dark_mode' : 'light_mode' }}</mat-icon>
                        </div>
                        <div>
                          <p class="text-sm font-bold text-secondary leading-tight">Force Dark Interface</p>
                          <p class="text-[10px] text-slate-800 mt-1 uppercase tracking-wider font-black">Overrides system defaults</p>
                        </div>
                      </div>
                      <div (click)="toggleDarkMode()" (keydown.enter)="toggleDarkMode()" role="button" tabindex="0" class="relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300" [class.bg-primary]="isDarkMode()" [class.bg-slate-200]="!isDarkMode()">
                        <div class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm" [class.translate-x-6]="isDarkMode()"></div>
                      </div>
                    </div>
                    <p class="text-[11px] text-slate-800 leading-relaxed pl-14">The dark interface reduces eye strain and power consumption on high-end displays. This setting is saved globally for your account.</p>
                  </div>

                  <!-- Preference Item 2: Notifications -->
                  <div class="flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm">
                          <mat-icon>mark_email_read</mat-icon>
                        </div>
                        <div>
                          <p class="text-sm font-bold text-secondary leading-tight">Critical Email Alerts</p>
                          <p class="text-[10px] text-slate-800 mt-1 uppercase tracking-wider font-black">Lead & Security notifications</p>
                        </div>
                      </div>
                      <div (click)="settingsData().emailNotifications = !settingsData().emailNotifications" (keydown.enter)="settingsData().emailNotifications = !settingsData().emailNotifications" role="button" tabindex="0" class="relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300" [class.bg-primary]="settingsData().emailNotifications" [class.bg-slate-200]="!settingsData().emailNotifications">
                        <div class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm" [class.translate-x-6]="settingsData().emailNotifications"></div>
                      </div>
                    </div>
                    @if (settingsData().emailNotifications) {
                      <div class="pl-14 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Notification Email Destination</div>
                        <input type="email" [(ngModel)]="settingsData().notificationEmail" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Database & Backup -->
              <div class="bg-white rounded-[2rem] border border-slate-200/60 shadow-xs p-8">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                    <mat-icon>storage</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-secondary">Advanced Infrastructure</h3>
                    <p class="text-xs text-slate-800 uppercase tracking-widest font-black mt-1">Data Storage & Integrity</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <!-- Preference Item 3: Auto Sync -->
                  <div class="flex flex-col gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-sm">
                          <mat-icon>sync</mat-icon>
                        </div>
                        <div>
                          <p class="text-sm font-bold text-secondary leading-tight">Automated Cloud Sync</p>
                          <p class="text-[10px] text-slate-800 mt-1 uppercase tracking-wider font-black">Real-time background backup</p>
                        </div>
                      </div>
                      <div (click)="settingsData().autoSync = !settingsData().autoSync" (keydown.enter)="settingsData().autoSync = !settingsData().autoSync" role="button" tabindex="0" class="relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300" [class.bg-primary]="settingsData().autoSync" [class.bg-slate-200]="!settingsData().autoSync">
                        <div class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm" [class.translate-x-6]="settingsData().autoSync"></div>
                      </div>
                    </div>
                    @if (settingsData().autoSync) {
                      <div class="pl-14 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Sync Frequency</div>
                        <select [(ngModel)]="settingsData().syncInterval" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                          <option [value]="5">Every 5 Minutes</option>
                          <option [value]="15">Every 15 Minutes</option>
                          <option [value]="30">Every 30 Minutes</option>
                          <option [value]="60">Every Hour</option>
                        </select>
                      </div>
                    }
                  </div>

                  <div class="pt-2">
                    <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4 ml-1">System Health Control</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button (click)="exportCSV()" mat-stroked-button class="!rounded-2xl !border-slate-200 !text-secondary !font-bold !py-8 hover:!bg-slate-50 transition-all !w-full">
                        <span class="flex items-center gap-2 justify-center"><mat-icon class="!text-[18px]">cloud_download</mat-icon> System Audit LOG</span>
                      </button>
                      <button (click)="clearDrafts()" mat-flat-button class="!rounded-2xl !bg-rose-50 !text-rose-600 !font-bold !py-8 hover:!bg-rose-100 transition-all !w-full shadow-none border border-rose-100">
                        <span class="flex items-center gap-2 justify-center"><mat-icon class="!text-[18px]">delete_sweep</mat-icon> Purge Live Drafts</span>
                      </button>
                      <button (click)="triggerSync()" mat-flat-button class="md:col-span-2 !rounded-2xl !bg-emerald-500 !text-white !font-bold !py-8 hover:!scale-[1.01] transition-all !w-full shadow-lg shadow-emerald-500/20">
                        <span class="flex items-center gap-2 justify-center text-lg"><mat-icon class="!text-[24px]">published_with_changes</mat-icon> Force Cloud Sync NOW</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button mat-flat-button (click)="saveSystemSettings()" class="!rounded-[2rem] !bg-primary !text-white !font-bold !px-12 !py-7 shadow-2xl shadow-blue-500/40 hover:scale-[1.02] transition-transform text-lg">
                <span class="flex items-center gap-2"><mat-icon>save</mat-icon> Finalize Global Updates</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <!-- Service Job Editor Modal -->
      @if (selectedServiceJob()) {
        <div class="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
          <div role="button" tabindex="0" (keydown.enter)="selectedServiceJob.set(null)" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" (click)="selectedServiceJob.set(null)"></div>
          <div class="bg-white rounded-[2rem] shadow-2xl relative w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 sm:px-10 sm:py-8 border-b border-slate-100 bg-white z-10 shrink-0">
              <div class="flex items-center gap-5">
                <div class="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm">
                   <mat-icon class="!text-3xl">assignment_turned_in</mat-icon>
                </div>
                <div>
                  <h3 class="text-2xl font-black font-display text-secondary leading-tight">{{selectedServiceJob()?.id === 0 ? 'File New Service' : 'Update Job Order'}}</h3>
                  <p class="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-1">Technical Service Tracking</p>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 sm:px-10 sm:py-8 overflow-y-auto bg-white/50 backdrop-blur-sm scrollbar-thin">
              <div class="space-y-8 pb-4">
                <!-- Client Info Section -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-client">Patient/Client Name</label>
                    <div class="relative">
                      <input type="text" [(ngModel)]="selectedServiceJob()!.clientName" id="job-client"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        placeholder="Full name">
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">person</mat-icon>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-contact">Contact Number</label>
                    <div class="relative">
                      <input type="text" [(ngModel)]="selectedServiceJob()!.contactNumber" id="job-contact"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        placeholder="e.g. 09XX XXX XXXX">
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">phone</mat-icon>
                    </div>
                  </div>
                </div>

                <!-- Job Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-service-type">Service Type</label>
                    <div class="relative">
                      <input [(ngModel)]="selectedServiceJob()!.serviceType" id="job-service-type" list="service-types-list"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        placeholder="Select or type service type">
                      <datalist id="service-types-list">
                        @for (s of adminServices(); track s.id) {
                          <option [value]="s.title"></option>
                        }
                      </datalist>
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">engineering</mat-icon>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-tech">Assigned Technician</label>
                    <div class="relative">
                      <input type="text" [(ngModel)]="selectedServiceJob()!.technician" id="job-tech"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                        placeholder="Technician name">
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">badge</mat-icon>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-date">Scheduled Date</label>
                    <div class="relative">
                      <input type="date" [(ngModel)]="selectedServiceJob()!.scheduledDate" id="job-date"
                        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner">
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">event</mat-icon>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-status">Current Status</label>
                    <div class="relative">
                      <select [(ngModel)]="selectedServiceJob()!.status" id="job-status"
                        class="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary outline-none transition-all shadow-inner">
                        <option value="Pending">Pending</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                      <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">info</mat-icon>
                      <mat-icon class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</mat-icon>
                    </div>
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-location">Service Location</label>
                  <div class="relative">
                    <input type="text" [(ngModel)]="selectedServiceJob()!.location" id="job-location"
                      class="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-sm font-bold text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
                      placeholder="e.g. Brgy. 4, Calamba, Laguna">
                    <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">location_on</mat-icon>
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1" for="job-notes">Technical Notes</label>
                  <textarea [(ngModel)]="selectedServiceJob()!.notes" id="job-notes" rows="4"
                    class="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-secondary focus:border-primary outline-none transition-all shadow-inner resize-none placeholder:text-slate-300"
                    placeholder="Enter detailed instructions, symptoms reported by client, or required parts..."></textarea>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-6 sm:px-10 sm:py-6 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-4 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.035)] z-10">
              @if (selectedServiceJob()!.id !== 0) {
                <button mat-button (click)="deleteServiceJob(selectedServiceJob()!.id)" class="!font-bold !text-rose-500 hover:!bg-rose-50 rounded-xl px-6 w-full sm:w-auto">Delete Order</button>
              } @else {
                <div class="hidden sm:block"></div>
              }
              <div class="flex gap-4 w-full sm:w-auto">
                <button mat-button (click)="selectedServiceJob.set(null)" class="!font-bold w-full sm:w-auto px-8 rounded-xl hover:bg-slate-50 py-4 transition-colors">Cancel</button>
                <button mat-flat-button (click)="saveServiceJob()" [disabled]="!selectedServiceJob()!.clientName || !selectedServiceJob()!.location"
                  class="!rounded-xl !bg-primary !text-white !font-bold !px-12 !py-6 w-full sm:w-auto shadow-xl shadow-blue-500/30 hover:scale-[1.03] transition-all disabled:opacity-50 disabled:scale-100">
                  {{ selectedServiceJob()!.id === 0 ? 'File Job Order' : 'Update Record' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- System Notifications Modal -->
      @if (showNotificationsModal()) {
        <div class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div role="button" tabindex="0" (keydown.enter)="showNotificationsModal.set(false)" class="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" (click)="showNotificationsModal.set(false)"></div>
          <div class="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl relative w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-400">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 sm:px-12 border-b border-slate-100 bg-white/80 backdrop-blur-xl z-10 gap-4 sm:gap-0 relative">
              <div class="flex items-center gap-4 sm:gap-6">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-inner shrink-0">
                   <mat-icon class="!text-2xl sm:!text-3xl">notifications_active</mat-icon>
                </div>
                <div>
                  <h3 class="text-xl sm:text-2xl font-black font-display text-secondary tracking-tight leading-tight">System Notifications</h3>
                  <p class="text-[9px] sm:text-[10px] font-black text-slate-800 uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-1 pl-0.5">Real-time alerts & logs</p>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-8 sm:px-12 overflow-y-auto bg-slate-50/30 scrollbar-thin flex-grow">
              @if (notifications().length > 0) {
                <div class="space-y-3 sm:space-y-4 py-2">
                  @for (notif of notifications(); track notif.id) {
                    <div class="flex items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all group relative overflow-hidden">
                      <div [class]="'w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm ' + notif.color">
                        <mat-icon class="!text-lg sm:!text-xl">{{notif.icon}}</mat-icon>
                      </div>
                      <div class="flex-grow">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-1 gap-1 sm:gap-0">
                          <p class="text-sm font-black text-secondary">{{notif.title}}</p>
                          <span class="text-[9px] sm:text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full w-fit">{{notif.time}}</span>
                        </div>
                        <p class="text-xs text-slate-800 font-medium leading-relaxed pr-6 sm:pr-8">{{notif.message}}</p>
                      </div>
                      <button mat-icon-button (click)="removeNotification(notif.id)" class="absolute right-2 sm:right-4 top-4 sm:top-1/2 sm:-translate-y-1/2 sm:opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-xl">
                        <mat-icon class="!text-base sm:!text-lg">delete_outline</mat-icon>
                      </button>
                    </div>
                  }
                </div>
              } @else {
                <div class="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
                  <div class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 border border-slate-200">
                    <mat-icon class="!text-4xl sm:!text-5xl text-slate-300">notifications_none</mat-icon>
                  </div>
                  <h4 class="text-secondary font-black text-base sm:text-lg">No active alerts</h4>
                  <p class="text-slate-800 text-xs sm:text-sm mt-2 max-w-xs font-medium">Your system is running smoothly. New notifications will appear here as they arrive.</p>
                </div>
              }
            </div>

            <!-- Footer -->
            <div class="p-6 sm:p-8 sm:px-12 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-0 z-10 relative">
              <button mat-button (click)="clearAllNotifications()" [disabled]="notifications().length === 0" class="w-full sm:w-auto !font-black !text-rose-500 hover:!bg-rose-50 rounded-2xl px-6 sm:px-8 !py-5 sm:!py-6 transition-all disabled:opacity-30">
                Clear All Logs
              </button>
              <button mat-flat-button (click)="showNotificationsModal.set(false)" class="w-full sm:w-auto !rounded-xl sm:!rounded-2xl !bg-slate-900 !text-white !font-black !px-8 sm:!px-12 !py-5 sm:!py-6 hover:bg-secondary transition-all shadow-xl shadow-slate-200">
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Inquiry Details Modal -->
      @if (selectedInquiry()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div role="button" tabindex="0" (keydown.enter)="selectedInquiry.set(null)" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" (click)="selectedInquiry.set(null)"></div>
          <div class="bg-white rounded-[2rem] shadow-2xl relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between p-6 sm:px-8 sm:py-6 border-b border-slate-100 bg-white">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                   <mat-icon>mail</mat-icon>
                </div>
                <div>
                  <h3 class="text-xl font-bold font-display text-secondary">Inquiry Details</h3>
                  <p class="text-xs font-bold text-slate-800 font-mono tracking-tighter">ID: {{selectedInquiry()!.id}}</p>
                </div>
              </div>
            </div>
            <div class="p-6 sm:p-8 overflow-y-auto">
              <div class="space-y-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Customer Name</div>
                    <p class="text-sm font-bold text-secondary bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{selectedInquiry()!.customerName}}</p>
                  </div>
                  <div>
                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</div>
                    <p class="text-sm font-bold text-secondary bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{selectedInquiry()!.email}}</p>
                  </div>
                  <div>
                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</div>
                    <p class="text-sm font-bold text-secondary bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{selectedInquiry()!.phone}}</p>
                  </div>
                  <div>
                    <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Interest / Product</div>
                    <p class="text-sm font-bold text-secondary bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">{{selectedInquiry()!.productName}}</p>
                  </div>
                </div>
                <div>
                  <div class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Message Content</div>
                  <div class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm text-secondary leading-relaxed shadow-inner">
                    {{selectedInquiry()!.message}}
                  </div>
                </div>
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div class="flex items-center gap-3">
                     <mat-icon class="text-slate-400">schedule</mat-icon>
                     <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Received: {{selectedInquiry()!.createdAt | date:'medium'}}</span>
                   </div>
                   <div class="flex items-center gap-2">
                     <span class="text-[10px] font-black text-slate-400 uppercase">Status:</span>
                     <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" 
                       [class]="selectedInquiry()!.status === 'new' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'">
                       {{selectedInquiry()!.status}}
                     </span>
                   </div>
                </div>
              </div>
            </div>
            <div class="p-6 sm:px-8 sm:py-5 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row justify-end items-center gap-4 mt-auto">
              <button mat-button (click)="selectedInquiry.set(null)" class="!font-bold w-full sm:w-auto px-8">Close</button>
              @if (selectedInquiry()!.status === 'new') {
                <button mat-flat-button (click)="updateInquiryStatus(selectedInquiry()!, 'replied'); selectedInquiry.set(null)" class="!rounded-xl !bg-emerald-600 !text-white !font-bold !px-8 w-full sm:w-auto shadow-lg shadow-emerald-500/20">Mark as Replied</button>
              }
            </div>
          </div>
        </div>
      }

      <!-- Services Preview Modal -->
      @if (showServicePreview()) {
        <div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div role="button" tabindex="0" (keydown.enter)="cancelPreviewService()" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="cancelPreviewService()"></div>
          
          <div class="bg-white rounded-[2rem] shadow-2xl relative w-full xl:max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between p-6 sm:px-8 border-b border-slate-100 bg-white">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                   <mat-icon>visibility</mat-icon>
                </div>
                <div>
                  <h3 class="text-xl font-bold font-display text-secondary leading-tight">Preview: Our Services</h3>
                  <p class="text-xs font-bold text-slate-800">Temporary Website Reflection</p>
                </div>
              </div>
            </div>
            
            <div class="p-4 sm:p-8 overflow-y-auto bg-slate-50">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @for (service of previewServicesList(); track service.title) {
                  <div class="group relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm flex flex-col overflow-hidden pointer-events-none">
                    <div class="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-8">
                      <mat-icon class="text-3xl">{{service.icon}}</mat-icon>
                    </div>
                    <h3 class="relative z-10 text-2xl font-bold text-secondary mb-4">{{service.title}}</h3>
                    <p class="relative z-10 text-slate-800 leading-relaxed mb-6 flex-grow">{{service.description}}</p>
                    <ul class="relative z-10 space-y-3 mb-8">
                      @for (item of service.features; track item) {
                        <li class="flex items-center gap-3 text-sm text-slate-500">
                          <mat-icon class="text-primary text-sm">check_circle</mat-icon>
                          {{item}}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            </div>

            <div class="p-6 sm:px-8 sm:py-5 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-end items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button mat-button (click)="cancelPreviewService()" class="!font-bold !text-slate-500 w-full sm:w-auto px-6">Decline</button>
              <button mat-flat-button (click)="saveService()" class="!rounded-xl !bg-primary !text-white !font-bold !px-8 w-full sm:w-auto shadow-lg shadow-primary/30">Save to Website</button>
            </div>
          </div>
        </div>
      }

      <!-- Products Preview Modal -->
      @if (showProductPreview()) {
        <div class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
          <div role="button" tabindex="0" (keydown.enter)="cancelPreviewProduct()" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="cancelPreviewProduct()"></div>
          
          <div class="bg-white rounded-[2rem] shadow-2xl relative w-full xl:max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div class="flex items-center justify-between p-6 sm:px-8 border-b border-slate-100 bg-white">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                   <mat-icon>visibility</mat-icon>
                </div>
                <div>
                  <h3 class="text-xl font-bold font-display text-secondary leading-tight">Preview: Our Products</h3>
                  <p class="text-xs font-bold text-slate-800">Temporary Website Reflection</p>
                </div>
              </div>
            </div>
            
            <div class="p-4 sm:p-8 overflow-y-auto bg-slate-50">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                @for (prod of previewProductsList(); track prod.id) {
                  <div class="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm pointer-events-none">
                    <div class="aspect-square overflow-hidden bg-slate-50 relative">
                      <img [src]="prod.images && prod.images.length > 0 ? prod.images[0] : ''" class="w-full h-full object-cover" alt="product preview">
                      <div class="absolute top-4 left-4 flex gap-2">
                        <div class="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-500/10">
                          {{prod.category}}
                        </div>
                        @if (!prod.inStock) {
                          <div class="px-3 py-1 bg-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Out of Stock
                          </div>
                        }
                      </div>
                    </div>
                    <div class="p-8">
                      <h3 class="text-xl font-bold text-secondary mb-2">{{prod.name}}</h3>
                      <p class="text-slate-800 text-sm mb-6 leading-relaxed">{{prod.desc}}</p>
                      
                      <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                          
                          <!-- Mock Share Icons -->
                          <div class="flex gap-2">
                             <div class="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300">
                               <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                             </div>
                             <div class="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300">
                               <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                             </div>
                          </div>
                        </div>

                        <div class="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">
                          <mat-icon class="text-sm">request_quote</mat-icon>
                          Request a Quote
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="p-6 sm:px-8 sm:py-5 border-t border-slate-100 bg-white flex flex-col-reverse sm:flex-row justify-end items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <button mat-button (click)="cancelPreviewProduct()" class="!font-bold !text-slate-500 w-full sm:w-auto px-6">Decline</button>
              <button mat-flat-button (click)="saveProduct()" class="!rounded-xl !bg-emerald-600 !text-white !font-bold !px-8 w-full sm:w-auto shadow-lg shadow-emerald-500/30">Save to Website</button>
            </div>
          </div>
        </div>
      }

      <!-- Notification Toast -->
      <div 
        class="fixed top-4 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
        [class]="notificationMessage() ? 'translate-y-0 opacity-100 bg-emerald-500 text-white slide-down' : '-translate-y-16 opacity-0 pointer-events-none bg-emerald-500 text-white'"
      >
        <mat-icon class="!text-xl">check_circle</mat-icon>
        <span class="font-bold text-sm">{{notificationMessage()}}</span>
      </div>

      <!-- Mobile Bottom Navigation -->
      <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div class="flex items-center justify-around h-16 sm:h-20">
          <button (click)="activeSection.set('dashboard')" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative" [ngClass]="activeSection() === 'dashboard' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'">
            <div class="absolute top-0 w-8 h-1 rounded-b-full bg-primary transition-all duration-300" [class.opacity-0]="activeSection() !== 'dashboard'" [class.scale-x-0]="activeSection() !== 'dashboard'"></div>
            <mat-icon [class.scale-110]="activeSection() === 'dashboard'" class="transition-transform duration-300">space_dashboard</mat-icon>
            <span class="text-[10px] sm:text-xs font-bold leading-none transition-all duration-300">Home</span>
          </button>
          
          <button (click)="activeSection.set('services')" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative" [ngClass]="activeSection() === 'services' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'">
            <div class="absolute top-0 w-8 h-1 rounded-b-full bg-primary transition-all duration-300" [class.opacity-0]="activeSection() !== 'services'" [class.scale-x-0]="activeSection() !== 'services'"></div>
            <mat-icon [class.scale-110]="activeSection() === 'services'" class="transition-transform duration-300">handyman</mat-icon>
            <span class="text-[10px] sm:text-xs font-bold leading-none transition-all duration-300">Services</span>
          </button>
          
          <button (click)="activeSection.set('products')" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative" [ngClass]="activeSection() === 'products' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'">
            <div class="absolute top-0 w-8 h-1 rounded-b-full bg-primary transition-all duration-300" [class.opacity-0]="activeSection() !== 'products'" [class.scale-x-0]="activeSection() !== 'products'"></div>
            <mat-icon [class.scale-110]="activeSection() === 'products'" class="transition-transform duration-300">inventory_2</mat-icon>
            <span class="text-[10px] sm:text-xs font-bold leading-none transition-all duration-300">Products</span>
          </button>
          
          <button (click)="activeSection.set('jobs')" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative" [ngClass]="activeSection() === 'jobs' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'">
            <div class="absolute top-0 w-8 h-1 rounded-b-full bg-primary transition-all duration-300" [class.opacity-0]="activeSection() !== 'jobs'" [class.scale-x-0]="activeSection() !== 'jobs'"></div>
            <mat-icon [class.scale-110]="activeSection() === 'jobs'" class="transition-transform duration-300">assignment_turned_in</mat-icon>
            <span class="text-[10px] sm:text-xs font-bold leading-none transition-all duration-300">Orders</span>
          </button>
        </div>
      </nav>
    </div>
  `,
  styles: [`
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `]
})
export class AdminDashboard implements AfterViewInit, OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isRightSidebarOpen = signal(false);
  isDarkMode = signal(false);
  showNotificationsModal = signal(false);
  activeSection = signal<'dashboard'|'services'|'products'|'jobs'|'website'|'profile'|'settings'|'inquiries'>('dashboard');

  activeWebsiteTab = signal<'home'|'services'|'products'|'about'|'contact'|'faq'|'footer'>('home');
  selectedServiceDetailId = signal<string>('solar-installation');

  newInquiriesCount = computed(() => this.adminInquiries().filter(i => i.status === 'new').length);
  
  activeSectionLabel = computed(() => {
    switch (this.activeSection()) {
      case 'dashboard': return 'Dashboard Overview';
      case 'services': return 'Manage Services';
      case 'products': return 'Manage Products';
      case 'jobs': return 'Service Job Orders';
      case 'website': return 'Edit Website';
      case 'inquiries': return 'Customer Inquiries';
      case 'profile': return 'My Profile';
      case 'settings': return 'Account Settings';
      default: return 'Admin Panel';
    }
  });

  adminInquiries = signal<Inquiry[]>([
    { id: '1', customerName: 'Juan Dela Cruz', email: 'juan@example.com', phone: '09123456789', productName: 'Blucid Mono-Crystalline 550W', message: 'I would like to request a quote for 10 panels for my house in Calamba.', status: 'new', createdAt: '2026-04-20T10:30:00Z' },
    { id: '2', customerName: 'Maria Santos', email: 'maria@example.com', phone: '09176543210', productName: 'Lithium Iron Phosphate 10kWh', message: 'Interested in a battery backup system for our office.', status: 'replied', createdAt: '2026-04-19T14:45:00Z' },
    { id: '3', customerName: 'Antonio Luna', email: 'antonio@blucid.com', phone: '09998887766', productName: 'Hybrid Solar Inverter 5kW', message: 'Does this inverter support dual MPPT?', status: 'new', createdAt: '2026-04-21T09:15:00Z' }
  ]);

  inquiryFilter = signal('');
  inquirySort = signal<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  filteredInquiries = computed(() => {
    let result = [...this.adminInquiries()];
    const filter = this.inquiryFilter().toLowerCase();
    
    if (filter) {
      result = result.filter(i => 
        i.customerName.toLowerCase().includes(filter) || 
        i.email.toLowerCase().includes(filter) ||
        i.productName.toLowerCase().includes(filter)
      );
    }
    
    const sort = this.inquirySort();
    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort.key as keyof Inquiry];
        const valB = b[sort.key as keyof Inquiry];
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  activeAccordionSection = signal<string>('hero');

  settingsData = signal({
    emailNotifications: true,
    autoSync: false,
    publicAnalytics: true,
    notificationEmail: 'admin@blucid.com',
    syncInterval: 15
  });

  adminProfile = signal({
    name: 'System Admin',
    email: 'admin@blucid.com',
    role: 'System Administrator',
    avatar: 'A',
    avatarImage: '',
    phone: '+63 912 345 6789',
    company: 'Blucid Enterprise Inc.',
    password: '••••••••'
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  websiteData = signal<any>({
    home: {
      heroTitle: 'Power Your Future with Clean Solar Energy',
      heroSubtitle: 'Blucid Enterprise Inc. provides professional solar system installations, high-quality panels, and complete electrical setups for residential and commercial properties in Laguna.',
      bannerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgh9oWfrFuDp4RP4of2ukqm1hC_xupXkvpA&s',
      heroImages: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgh9oWfrFuDp4RP4of2ukqm1hC_xupXkvpA&s',
        'https://images.unsplash.com/photo-1509391366360-fe5bb65830bb?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2070&auto=format&fit=crop'
      ],
      heroTrustText: 'Trusted by 500+ Businesses',
      brands: [
        { name: 'Brand 1', icon: '', img: '/img/logo/Picture1.png' },
        { name: 'Brand 2', icon: '', img: '/img/logo/Picture2.png' },
        { name: 'Brand 3', icon: '', img: '/img/logo/Picture3.png' },
        { name: 'Brand 4', icon: '', img: '/img/logo/Picture4.png' },
        { name: 'Brand 5', icon: '', img: '/img/logo/Picture5.png' },
        { name: 'Brand 6', icon: '', img: '/img/logo/Picture6.png' },
        { name: 'Brand 7', icon: '', img: '/img/logo/Picture7.png' },
        { name: 'Brand 8', icon: '', img: '/img/logo/Picture8.png' },
        { name: 'Brand 9', icon: '', img: '/img/logo/Picture9.png' },
        { name: 'Brand 10', icon: '', img: '/img/logo/Picture10.png' },
        { name: 'Brand 11', icon: '', img: '/img/logo/Picture11.png' },
        { name: 'Brand 12', icon: '', img: '/img/logo/Picture12.png' },
        { name: 'Brand 13', icon: '', img: '/img/logo/Picture13.png' },
        { name: 'Brand 14', icon: '', img: '/img/logo/Picture14.png' }
      ],
      featuresTitle: 'Why Choose Blucid?',
      featuresSubtitle: 'We don\'t just install panels; we build long-term energy independence for our clients with premium hardware and expert engineering.',
      features: [
         { title: 'Expert Installation', desc: 'Our certified engineers ensure every panel and wire is perfectly placed for maximum efficiency and safety.', icon: 'engineering' },
         { title: 'Premium Quality', desc: 'We only use top-tier solar panels, battery supplies, and volt switch panels from trusted global manufacturers.', icon: 'verified' },
         { title: 'Lifetime Support', desc: 'Our relationship doesn\'t end at installation. We provide ongoing maintenance and technical support for your system.', icon: 'support_agent' }
      ],
      businessNaturesTitle: 'Nature of Business',
      businessNaturesSubtitle: 'Comprehensive electrical and engineering solutions tailored to your specific requirements.',
      businessNatures: [
        { category: 'Contracting', title: 'Electrical Works', icon: 'electrical_services', desc: 'Expert contracting and sub-contracting for all types of electrical installations and wiring.' },
        { category: 'Telecommunications', title: 'Telecom Projects', icon: 'cell_tower', desc: 'Pole erection, fiber optic cable laying & fixing, cable splicing, batteries and rectifier installation.' },
        { category: 'Sustainable Energy', title: 'Solar PV Systems', icon: 'solar_power', desc: 'Design, supply, and installation of Solar PV Systems for residential, commercial, and industrial.' },
        { category: 'Power Backup', title: 'UPS Systems', icon: 'battery_charging_full', desc: 'Complete UPS supply, reliable installation, and ongoing maintenance.' },
        { category: 'HVAC', title: 'Air Conditioning', icon: 'ac_unit', desc: 'Supply, installation, and maintenance of advanced Air Conditioning Systems.' },
        { category: 'Construction', title: 'General Construction', icon: 'architecture', desc: 'Small and medium-sized construction projects and professional renovation services.' }
      ],
      portfolioTitle: 'Our Portfolio',
      projectsTitle: 'Accomplished Projects',
      projectsSubtitle: 'Explore some of our recent installations and see how we are empowering the community with clean energy.',
      projects: PORTFOLIO_PROJECTS,
      portfolioDisplayFormat: 'grid', // 'grid' or 'carousel'
      proposalTitle: 'Get a Detailed Proposal',
      proposalSubtitle: 'Every roof is unique. Our engineers provide a free site visit and 3D shading analysis for precise accuracy.',
      proposalButtonText: 'Send My Details',
      ratingValue: '4.9/5',
      ratingLabel: 'Average Rating',
      projectOverviewTitle: 'Project Overview',
      galleryTitle: 'Gallery',
      gallerySubtitle: 'A Closer Look',
      videoTitle: 'Experience the Power of the Sun',
      videoDescription: 'Watch how Blucid Enterprise transforms homes and businesses with sustainable energy. Our integrated solar solutions provide reliable, cost-effective power while reducing your carbon footprint.',
      videoStats: [
        { value: '500+', label: 'Installations' },
        { value: '15MW', label: 'Clean Energy' }
      ],
      videoUrl: 'https://youbite-medical.web.app/blucid.mp4',
      testimonialsTitle: 'Testimonials',
      testimonialsSubtitle: 'What our clients say about Blucid',
      testimonials: [
        {
          name: 'Roberto Santos',
          role: 'Homeowner, Calamba',
          quote: 'Switching to solar with Blucid was the best decision for our family. Our electric bill dropped by 80% and the installation was incredibly professional.',
          image: 'https://picsum.photos/seed/person1/100/100'
        },
        {
          name: 'Maria Clara',
          role: 'Business Owner, Real',
          quote: 'The team at Blucid handled everything from the wiring to the volt switch panels. Their technical expertise is unmatched in Laguna.',
          image: 'https://picsum.photos/seed/person2/100/100'
        },
        {
          name: 'Antonio Luna',
          role: 'Facility Manager',
          quote: 'We needed a robust battery backup system for our warehouse. Blucid delivered a high-capacity solution that has never failed us.',
          image: 'https://picsum.photos/seed/person3/100/100'
        }
      ],
      ctaTitle: 'Ready to switch to solar?',
      ctaSubtitle: 'Join hundreds of satisfied customers in Laguna who are saving thousands on their electricity bills.',
      ctaButtonText: 'Start Your Journey'
    },
    services: {
      headerTitle: 'Our Services',
      headerSubtitle: 'Comprehensive solutions for every need',
      bannerImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop',
      secondaryTitle: 'Custom Wiring & Installation',
      secondaryDescription: 'Beyond solar panels, we specialize in complete wiring installation setups. Whether it\'s a new building or a retrofit, our team ensures your electrical infrastructure is robust, safe, and ready for high-efficiency energy.',
      serviceDetails: {
        'solar-installation': {
          title: 'Solar PV Systems',
          icon: 'solar_power',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQctbPWABdXPJKsNvikAgQgGF8mU-tF2UDw&s',
          longDescription: 'Our comprehensive solar installation service is designed to provide you with a seamless transition to clean energy. We handle everything from initial site assessment to final grid connection, ensuring your system is optimized for the specific conditions of your property in Laguna.',
          benefits: [
            { title: 'Cost Savings', icon: 'payments', desc: 'Reduce your monthly electricity bills by up to 85%.' },
            { title: 'Eco-Friendly', icon: 'eco', desc: 'Significantly lower your carbon footprint.' },
            { title: 'Property Value', icon: 'trending_up', desc: 'Increase the market value of your home or business.' },
            { title: 'Energy Security', icon: 'security', desc: 'Protect yourself from rising utility costs.' }
          ],
          process: [
            { title: 'Consultation & Site Audit', desc: 'We visit your property to analyze roof orientation, shading, and energy needs.' },
            { title: 'Custom Engineering', desc: 'Our engineers design a system tailored to your specific energy profile and budget.' },
            { title: 'Professional Installation', desc: 'Our certified team installs the panels, inverters, and mounting hardware with precision.' },
            { title: 'Testing & Commissioning', desc: 'We rigorously test the system before connecting it to the grid and handing it over.' }
          ],
          faqs: [
            { q: 'How long does a typical installation take?', a: 'Most residential installations are completed within 2-3 days, while larger commercial projects can take 1-2 weeks.' },
            { q: 'Will I still have power during an outage?', a: 'Standard grid-tied systems shut down during outages for safety. To have power during an outage, you\'ll need a battery backup system.' }
          ]
        },
        'electrical-works': {
          title: 'Electrical Contracting',
          icon: 'electrical_services',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7_lL0dV4xZPt7GKHfcPdbajtWNEDqsK-VJw&s',
          longDescription: 'Expert contracting and sub-contracting for all types of electrical installations and wiring. We guarantee safety, compliance, and optimized performance for all projects.',
          benefits: [
            { title: 'Safety First', icon: 'verified_user', desc: 'All wiring is exactly to code.' },
            { title: 'Turnkey Solution', icon: 'bolt', desc: 'Everything from mapping to final approval.' }
          ],
          process: [
            { title: 'Load Analysis', desc: 'Calculate energy demands and map layout.' },
            { title: 'Installation Phase', desc: 'Secure, organized, and properly labeled deployment.' }
          ],
          faqs: [
            { q: 'Do you handle the permits?', a: 'Yes, we take care of all local permits.' }
          ]
        },
        'telecom-projects': {
          title: 'Telecom Projects',
          icon: 'cell_tower',
          image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2000',
          longDescription: 'Comprehensive telecommunication installations including pole erection, fiber optic cable laying & fixing, cable splicing, and battery/rectifier installation.',
          benefits: [
            { title: 'High Bandwidth', icon: 'network_check', desc: 'State of the art fiber optic splicing.' },
            { title: 'Robust Backbone', icon: 'hub', desc: 'End-to-end reliable telecom infrastructure.' }
          ],
          process: [
            { title: 'Site Survey', desc: 'Determine the best layouts for telecom poles and lines.' },
            { title: 'Execution', desc: 'Laying cable, splicing, and final load tests.' }
          ],
          faqs: [
            { q: 'Do you provide maintenance?', a: 'Yes, full maintenance is available for existing networks.' }
          ]
        },
        'ups-systems': {
          title: 'UPS Systems',
          icon: 'battery_saver',
          image: 'https://roadtrek.com.au/wp-content/uploads/2022/11/web-IMG_8873-1024x819.jpg',
          longDescription: 'Reliable Uninterruptible Power Supply (UPS) supply, installation, and maintenance to avoid any downtime for critical equipment during grid failure.',
          benefits: [
            { title: 'Zero Downtime', icon: 'timer', desc: 'Instant active backup power.' },
            { title: 'Protection', icon: 'security', desc: 'Surge and spike protection for your devices.' }
          ],
          process: [
            { title: 'Load Calculation', desc: 'Determine required standard capacity.' },
            { title: 'Hardware Setup', desc: 'Rack mounting, wiring, and synthetic load testing.' }
          ],
          faqs: [
            { q: 'What is the battery lifespan?', a: 'Depending on the model, it can last 3-6 years.' }
          ]
        },
        'air-conditioning': {
          title: 'Air Conditioning Systems',
          icon: 'ac_unit',
          image: 'https://images.unsplash.com/photo-1595166258077-8fa0663db6c1?q=80&w=2000',
          longDescription: 'Complete supply, installation, and maintenance of advanced Air Conditioning systems, ensuring optimal climate control and efficiency.',
          benefits: [
            { title: 'Energy Efficiency', icon: 'eco', desc: 'Using advanced inverter compressor systems.' },
            { title: 'Comfort', icon: 'ac_unit', desc: 'Perfectly balanced climate at your fingertips.' }
          ],
          process: [
            { title: 'Layout Design', desc: 'Determine unit placements and capacity.' },
            { title: 'Installation & Maintenance', desc: 'Quick installation and regular cleaning schedules.' }
          ],
          faqs: [
            { q: 'Do you fix existing setups?', a: 'Yes, we have full diagnostic and repair capabilities.' }
          ]
        },
        'construction-renovation': {
          title: 'Construction & Renovation',
          icon: 'architecture',
          image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
          longDescription: 'Reliable execution of small and medium-sized construction projects, along with renovation services tailored space modifications.',
          benefits: [
            { title: 'Quality Craftsmanship', icon: 'handyman', desc: 'Impeccable details and durable building techniques.' },
            { title: 'Schedule Adherence', icon: 'event', desc: 'Strict timeline management for on-time delivery.' }
          ],
          process: [
            { title: 'Blueprint and Permits', desc: 'Finalize plans and acquire required docs.' },
            { title: 'Building Phase', desc: 'Manage trades, construction, and inspections.' }
          ],
          faqs: [
            { q: 'Is it turnkey?', a: 'Yes, we handle everything from conception to handover.' }
          ]
        }
      }
    },
    products: {
      headerTitle: 'Premium Solar Products',
      headerSubtitle: 'High-quality equipment with long warranties',
      bannerImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop',
    },
    about: {
      headerTitle: 'About Us',
      headerSubtitle: 'Our story and mission to green energy',
      bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      mission: 'Recognize our customer needs and provide flexibility in sourcing, competitive prices, on-time deliveries and customized solutions for their unique needs. Ensure attentive, effective and proactive customer service and personalized attention to customers. Sustain our reputation as a reliable, professional, customer-oriented, dynamic player in the market. Continually build our skills and knowledge to meet the growing and diverse needs of customers. Continuously improve our business processes leading to prompt and efficient sales and after sales services. Achieve profitable growth, operational and organizational excellence without compromising from our values and business ethics.',
      vision: 'BLUCID aims to be the preferred partner in supplying products and services for manufacturing, industrial, automotive, medical & banking industries. Being the "preferred choice" both for customers, suppliers and employees.',
      storyTitle: 'Pioneering Sustainable Energy in Laguna',
      storyParagraph: 'Founded with a vision to make clean energy accessible to everyone, Blucid Enterprise Inc. has grown into a leading provider of solar solutions in Calamba and the surrounding regions.'
    },
    contact: {
      headerTitle: 'Get In Touch',
      headerSubtitle: 'We would love to hear from you',
      bannerImage: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop',
      address: '123 Solar Street, Calamba, Laguna',
      email: 'hello@blucid.com',
      phone: '+63 912 345 6789',
      contactMethods: [
        { label: 'Facebook', value: 'facebook.com/search/top/?q=blucid%20enterprise%20inc.' },
        { label: 'Instagram', value: '@blucid' }
      ],
      formTitle: 'Project Details',
      officeTitle: 'Our Office',
      workingHours: 'MON to FRI at 8:00 AM - 5:00 PM'
    },
    faq: {
      headerTitle: 'Frequently Asked Questions',
      headerSubtitle: 'Find answers to common questions',
      bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
      questions: [
        { q: 'How much does a solar system cost?', a: 'The cost varies depending on your energy needs and the system size. We offer free assessments to provide an accurate quote.' },
        { q: 'Do you offer warranties?', a: 'Yes, all our solar panels come with a 25-year performance warranty and our workmanship is guaranteed for 5 years.' },
        { q: 'How long does installation take?', a: 'Most residential installations take 2-4 days, while commercial projects depend on the scale.' }
      ],
      ctaTitle: 'Still have questions?',
      ctaDescription: 'Can\'t find the answer you\'re looking for? Please chat to our friendly team.',
      ctaPhone: '0495205780'
    },
      footer: {
        description: 'Leading the way in sustainable energy solutions. We provide high-quality solar installations and electrical services for a brighter, greener future.',
        address: 'B1 L12, Cuervo II Rd, Real, Calamba, 4027 Laguna',
        phone: '(049) 520 5780',
        schedule: 'Mon - Fri: 8:00 AM - 5:00 PM',
        copyright: '© 2026 Blucid Enterprise Inc. All rights reserved.',
        bannerImage: ''
      },
      typography: {
        fontSans: 'Inter',
        fontDisplay: 'Outfit',
        fontMono: 'JetBrains Mono',
        h1Size: '4xl',
        h2Size: '3xl',
        h3Size: '2xl',
        h4Size: 'xl',
        baseSize: 'sm'
      },
      theme: {
        primary: '#0ea5e9',
        secondary: '#0f172a',
        accent: '#10b981'
      }
    });

  addHeroImage() {
    this.websiteData.update(data => {
      if (!data.home.heroImages) data.home.heroImages = [];
      data.home.heroImages.push('https://picsum.photos/seed/' + Math.random() + '/1920/1080');
      return { ...data };
    });
  }

  removeHeroImage(index: number) {
    this.websiteData.update(data => {
      if (data.home.heroImages) {
        data.home.heroImages.splice(index, 1);
      }
      return { ...data };
    });
  }

  addFaqItem() {
    this.websiteData.update(data => {
      data.faq.questions.push({ q: '', a: '' });
      return { ...data };
    });
  }

  removeFaqItem(index: number) {
    this.websiteData.update(data => {
      data.faq.questions.splice(index, 1);
      return { ...data };
    });
  }

  addContactMethod() {
    this.websiteData.update(data => {
      (data as any).contact.contactMethods.push({ label: '', value: '' }); // eslint-disable-line @typescript-eslint/no-explicit-any
      return { ...data };
    });
  }

  removeContactMethod(index: number) {
    this.websiteData.update(data => {
      (data as any).contact.contactMethods.splice(index, 1); // eslint-disable-line @typescript-eslint/no-explicit-any
      return { ...data };
    });
  }

  addHomeFeature() {
    this.websiteData.update(data => {
      data.home.features.push({ title: '', desc: '', icon: 'star' });
      return { ...data };
    });
  }

  removeHomeFeature(index: number) {
    if (confirm('Are you sure you want to delete this feature card?')) {
      this.websiteData.update(data => {
        data.home.features.splice(index, 1);
        return { ...data };
      });
      this.showNotification('Feature card successfully removed');
    }
  }

  addBusinessNature() {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data.home as any).businessNatures) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data.home as any).businessNatures = [];
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).businessNatures.push({
        category: 'New Category',
        title: 'New Service',
        icon: 'stars',
        desc: 'Description goes here'
      });
      return { ...data };
    });
    this.showNotification('Expertise item added. Now fill in details.');
  }

  addServiceBenefit() {
    this.websiteData.update(data => {
      const id = this.selectedServiceDetailId();
      if (!data.services.serviceDetails[id].benefits) data.services.serviceDetails[id].benefits = [];
      data.services.serviceDetails[id].benefits.push({ title: 'New Benefit', icon: 'star', desc: 'Describe the benefit' });
      return { ...data };
    });
  }

  removeServiceBenefit(index: number) {
    if(confirm('Delete this benefit?')) {
      this.websiteData.update(data => {
        data.services.serviceDetails[this.selectedServiceDetailId()].benefits.splice(index, 1);
        return { ...data };
      });
    }
  }

  addDetailProcess() {
    this.websiteData.update(data => {
      const id = this.selectedServiceDetailId();
      if (!data.services.serviceDetails[id].process) data.services.serviceDetails[id].process = [];
      data.services.serviceDetails[id].process.push({ title: 'New Step', desc: 'Describe the process step' });
      return { ...data };
    });
  }

  removeDetailProcess(index: number) {
    if(confirm('Delete this process step?')) {
      this.websiteData.update(data => {
        data.services.serviceDetails[this.selectedServiceDetailId()].process.splice(index, 1);
        return { ...data };
      });
    }
  }

  addServiceFaq() {
    this.websiteData.update(data => {
      const id = this.selectedServiceDetailId();
      if (!data.services.serviceDetails[id].faqs) data.services.serviceDetails[id].faqs = [];
      data.services.serviceDetails[id].faqs.push({ q: 'Question?', a: 'Answer.' });
      return { ...data };
    });
  }

  removeServiceFaq(index: number) {
    if(confirm('Delete this FAQ?')) {
      this.websiteData.update(data => {
        data.services.serviceDetails[this.selectedServiceDetailId()].faqs.splice(index, 1);
        return { ...data };
      });
    }
  }

  removeBusinessNature(index: number) {
    if(confirm('Delete this expertise item?')) {
      this.websiteData.update(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data.home as any).businessNatures.splice(index, 1);
        return { ...data };
      });
      this.showNotification('Expertise item successfully removed');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropBusinessNature(event: CdkDragDrop<any>) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      moveItemInArray((data.home as any).businessNatures, event.previousIndex, event.currentIndex);
      return { ...data };
    });
  }

  addHomeProject() {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data.home as any).projects) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data.home as any).projects = [];
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).projects.push({ 
        id: 'new-project-' + Date.now(), 
        category: 'Solar Project',
        title: '', 
        client: '', 
        location: '', 
        systemSize: '',
        completionDate: '',
        energySaved: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
        gallery: []
      });
      return { ...data };
    });
  }

  removeHomeProject(index: number) {
    if (confirm('Are you sure you want to remove this project showcase from your home page?')) {
      this.websiteData.update(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data.home as any).projects.splice(index, 1);
        return { ...data };
      });
      this.showNotification('Portfolio project successfully removed');
    }
  }

  dropProject(event: CdkDragDrop<string[]>) {
    this.websiteData.update(data => {
      moveItemInArray((data.home as any).projects, event.previousIndex, event.currentIndex); // eslint-disable-line @typescript-eslint/no-explicit-any
      return { ...data };
    });
  }

  addHomeProjectGalleryImage(projectIndex: number) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const proj = (data.home as any).projects[projectIndex];
      if (proj) {
         if (!proj.gallery) proj.gallery = [];
         proj.gallery.push('');
      }
      return { ...data };
    });
  }

  removeHomeProjectGalleryImage(projectIndex: number, galleryIndex: number) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const proj = (data.home as any).projects[projectIndex];
      if (proj && proj.gallery) {
         proj.gallery.splice(galleryIndex, 1);
      }
      return { ...data };
    });
  }

  addBrand() {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data.home as any).brands) (data.home as any).brands = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).brands.push({ name: 'NEW BRAND', icon: 'star', img: '' });
      return { ...data };
    });
  }

  removeBrand(i: number) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).brands.splice(i, 1);
      return { ...data };
    });
  }

  addVideoStat() {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data.home as any).videoStats) (data.home as any).videoStats = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).videoStats.push({ value: '100+', label: 'New Stat' });
      return { ...data };
    });
  }

  removeVideoStat(i: number) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).videoStats.splice(i, 1);
      return { ...data };
    });
  }

  addTestimonial() {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(data.home as any).testimonials) (data.home as any).testimonials = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).testimonials.push({
        name: 'New Client',
        role: 'Position',
        quote: 'Amazing service!',
        image: 'https://picsum.photos/seed/client/100/100'
      });
      return { ...data };
    });
  }

  removeTestimonial(i: number) {
    this.websiteData.update(data => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data.home as any).testimonials.splice(i, 1);
      return { ...data };
    });
  }

  editAdminProject(project: DashboardProject) {
    this.selectedAdminProject.set({ ...project });
  }

  addSystemNotification(title: string, message: string, icon: string, color: string) {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      icon,
      color
    };
    this.notifications.update(list => [newNotif, ...list.slice(0, 9)]);
  }

  saveAdminProject() {
    const updated = this.selectedAdminProject();
    if (updated) {
      if (updated.id) {
         this.adminDashboardProjects.update(projs => 
            projs.map(p => p.id === updated.id ? updated : p)
         );
         this.addSystemNotification('Project Updated', `Project details for ${updated.client} have been saved.`, 'task_alt', 'bg-emerald-100 text-emerald-600');
      } else {
         const newId = this.adminDashboardProjects().length > 0 
           ? Math.max(...this.adminDashboardProjects().map(p => p.id as number)) + 1 
           : 1;
         const newProject = { ...updated, id: newId };
         this.adminDashboardProjects.update(projs => [...projs, newProject]);
         this.addSystemNotification('New Project Added', `Successfully added ${newProject.client} to the records.`, 'add_circle', 'bg-primary/10 text-primary');
      }
      this.selectedAdminProject.set(null);
      this.showNotification('Project successfully saved!');
    }
  }

  deleteAdminProject() {
    const project = this.selectedAdminProject();
    if (project && project.id) {
      if (confirm(`Are you sure you want to delete the project for ${project.client}?`)) {
        this.adminDashboardProjects.update(projs => projs.filter(p => p.id !== project.id));
        this.addSystemNotification('Project Records Purged', `Record for ${project.client} was deleted.`, 'delete_forever', 'bg-rose-100 text-rose-600');
        this.selectedAdminProject.set(null);
        this.showNotification('Project successfully deleted');
      }
    }
  }

  createNewAdminProject() {
    this.selectedAdminProject.set({
      id: null,
      client: '',
      location: '',
      size: '',
      status: 'In Progress',
      progress: 0,
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      engineer: ''
    });
  }

  selectedInquiry = signal<Inquiry | null>(null);

  viewInquiryDetails(inquiry: Inquiry) {
    this.selectedInquiry.set({ ...inquiry });
  }

  updateInquiryStatus(inquiry: Inquiry, status: 'new' | 'replied') {
    this.adminInquiries.update(list => list.map(i => i.id === inquiry.id ? { ...i, status } : i));
    this.saveInquiries();
    if (status === 'replied') {
      this.addSystemNotification('Inquiry Updated', `Marked message from ${inquiry.customerName} as handled.`, 'mark_email_read', 'bg-slate-100 text-slate-400');
    }
  }

  deleteInquiry(inquiry: Inquiry) {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      this.adminInquiries.update(list => list.filter(i => i.id !== inquiry.id));
      this.saveInquiries();
      this.showNotification('Inquiry deleted successfully');
    }
  }

  saveInquiries() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_inquiries', JSON.stringify(this.adminInquiries()));
    }
  }

  previewWebsite() {
     if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('blucid_website_draft', JSON.stringify(this.websiteData()));
        const previewUrl = this.activeWebsiteTab() === 'home' ? '/' : '/' + this.activeWebsiteTab();
        window.open(previewUrl, '_blank');
     }
  }

  saveWebsiteContent() {
    if (isPlatformBrowser(this.platformId)) {
       localStorage.setItem('blucid_website_content', JSON.stringify(this.websiteData()));
       localStorage.setItem('blucid_website_draft', JSON.stringify(this.websiteData()));
       localStorage.setItem('blucid_services', JSON.stringify(this.adminServices()));
       localStorage.setItem('blucid_products', JSON.stringify(this.adminProducts()));
    }
    this.addSystemNotification('Website Published', 'Current website contents and configurations have been published live.', 'publish', 'bg-blue-100 text-blue-600');
    this.showNotification('Website settings successfully saved!');
  }

  @ViewChildren('animateItem') items!: QueryList<ElementRef>;
  @ViewChildren('chartBar') chartBars!: QueryList<ElementRef>;

  constructor() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('admin_logged_in') !== 'true') {
      this.router.navigate(['/adminlogin']);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.isDarkMode.set(true);
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      const savedData = localStorage.getItem('blucid_website_content');
      if (savedData) {
         try {
           const parsed = JSON.parse(savedData);
           this.websiteData.update(current => ({
             ...current,
             ...parsed,
             home: {
                 ...current.home,
                 ...(parsed.home || {}),
                 projects: parsed.home?.projects || current.home.projects,
                 portfolioTitle: parsed.home?.portfolioTitle || current.home.portfolioTitle,
                 projectsTitle: parsed.home?.projectsTitle || current.home.projectsTitle,
                 projectsSubtitle: parsed.home?.projectsSubtitle || current.home.projectsSubtitle
             },
             typography: parsed.typography || current.typography,
             theme: parsed.theme || current.theme
           }));
         } catch { /* ignore */ }
      }

      const savedProfile = localStorage.getItem('blucid_admin_profile');
      if (savedProfile) {
         try {
           this.adminProfile.set(JSON.parse(savedProfile));
         } catch { /* ignore */ }
      }

      const settingsStr = localStorage.getItem('blucid_settings');
      if (settingsStr) {
        try {
          const s = JSON.parse(settingsStr);
          if (s) this.settingsData.set(s);
        } catch { /* ignore */ }
      }

      const productsStr = localStorage.getItem('blucid_products');
      if (productsStr) {
        try {
          const p = JSON.parse(productsStr);
          if (Array.isArray(p) && p.length > 0) {
            this.adminProducts.set(p);
          }
        } catch { /* ignore */ }
      }

      const inquiriesStr = localStorage.getItem('blucid_inquiries');
      if (inquiriesStr) {
        try {
          const inqs = JSON.parse(inquiriesStr);
          if (Array.isArray(inqs)) {
            this.adminInquiries.set(inqs);
          }
        } catch { /* ignore */ }
      }

      window.addEventListener('storage', (event) => {
        if (event.key === 'blucid_inquiries') {
          try {
            const fresh = JSON.parse(event.newValue || '[]');
            const old = this.adminInquiries();
            if (fresh.length > old.length) {
              const newInq = fresh[0];
              this.adminInquiries.set(fresh);
              this.addSystemNotification(
                'New Inquiry Received',
                `Customer ${newInq.customerName} sent a new message regarding ${newInq.productName}.`,
                'mail',
                'bg-blue-100 text-blue-600'
              );
            }
          } catch { /* ignore */ }
        }
      });
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('admin_logged_in');
    }
    this.router.navigate(['/adminlogin']);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initial entrance stagger for main dashboard cards/tables
      const htmlElements = this.items.map(r => r.nativeElement);
      animate(htmlElements, 
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.8, ease: 'backOut' }
      );

      // Chart bars animate up elegantly
      const barElements = this.chartBars.map(r => r.nativeElement);
      const targetHeights = this.chartData.map(d => `${d.value}%`);
      
      barElements.forEach((bar, i) => {
        animate(bar, 
          { height: ['5%', targetHeights[i]] },
          { delay: 0.4 + (i * 0.05), duration: 1.2, ease: 'backOut' }
        );
      });
    }
  }

  stats = computed(() => {
    const projects = this.adminDashboardProjects();
    const inProgress = projects.filter(p => p.status === 'In Progress').length;
    const completed = projects.filter(p => p.status === 'Completed').length;

    const jobs = this.adminServiceJobs();
    const serviceScheduled = jobs.filter(j => j.status === 'Scheduled').length;
    const serviceInProgress = jobs.filter(j => j.status === 'In Progress').length;
    const serviceCompleted = jobs.filter(j => j.status === 'Completed').length;

    return [
      { label: 'Total Services', value: this.adminServices().length.toString(), icon: 'handyman', color: 'bg-blue-100 text-blue-600', trend: '0' },
      { label: 'Total Products', value: this.adminProducts().length.toString(), icon: 'inventory_2', color: 'bg-emerald-100 text-emerald-600', trend: '0' },
      { label: 'PROJECT IN PROGRESS', value: inProgress.toString(), icon: 'pending_actions', color: 'bg-amber-100 text-amber-600', trend: '0' },
      { label: 'PROJECT COMPLETED', value: completed.toString(), icon: 'task_alt', color: 'bg-emerald-100 text-emerald-600', trend: '0' },
      { label: 'Services Schedule', value: serviceScheduled.toString(), icon: 'event_available', color: 'bg-indigo-100 text-indigo-600', trend: '0' },
      { label: 'Services In progress', value: serviceInProgress.toString(), icon: 'autorenew', color: 'bg-orange-100 text-orange-600', trend: '0' },
      { label: 'Schedule Completed', value: serviceCompleted.toString(), icon: 'check_circle', color: 'bg-emerald-100 text-emerald-600', trend: '0' },
      { label: 'Active Inquiries', value: this.adminInquiries().length.toString(), icon: 'mark_email_unread', color: 'bg-purple-100 text-purple-600', trend: '24' },
    ];
  });

  chartData = [
    { label: 'Jan', value: 40 }, 
    { label: 'Feb', value: 60 }, 
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 90 }, 
    { label: 'May', value: 65 }, 
    { label: 'Jun', value: 80 },
    { label: 'Jul', value: 50 }, 
    { label: 'Aug', value: 75 }, 
    { label: 'Sep', value: 95 },
    { label: 'Oct', value: 60 }, 
    { label: 'Nov', value: 70 }, 
    { label: 'Dec', value: 85 }
  ];

  activities = [
    { id: 1, title: 'New project inquiry from Calamba', time: '12 minutes ago', icon: 'email' },
    { id: 2, title: 'Installation completed: SM City', time: '2 hours ago', icon: 'task_alt' },
    { id: 3, title: 'Inventory alert: Battery Supply low', time: '5 hours ago', icon: 'warning' },
    { id: 4, title: 'Maintenance report: Rizal Site', time: 'Yesterday', icon: 'construction' },
  ];

  notifications = signal([
    { id: 1, title: 'Low Stock Alert', message: 'Solar Panels (500W) are below threshold (5 units left).', time: '10m ago', icon: 'inventory_2', color: 'bg-rose-100 text-rose-600' },
    { id: 2, title: 'New Service Job', message: 'Maria Cruz requested wiring setup in Santa Rosa.', time: '25m ago', icon: 'engineering', color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Project Milestone', message: 'SM City Santa Rosa reached 65% completion.', time: '1h ago', icon: 'trending_up', color: 'bg-emerald-100 text-emerald-600' },
  ]);

  adminDashboardProjects = signal<DashboardProject[]>([
    { id: 1, client: 'SM City Santa Rosa', location: 'Santa Rosa, Laguna', size: '500kW System', status: 'In Progress', progress: 65, description: 'Large scale commercial installation for peak load reduction.', startDate: '2026-03-15', engineer: 'Engr. Mike Reyes', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400' },
    { id: 2, client: 'Laguna Technopark', location: 'Biñan, Laguna', size: '1.2MW Commercial', status: 'Completed', progress: 100, description: 'Ground-mounted solar farm with grid-tied energy storage.', startDate: '2025-10-10', engineer: 'Engr. Sarah Lee', image: 'https://images.unsplash.com/photo-1613665813446-82a78c4458e7?w=400' },
    { id: 3, client: 'Residenza Homes', location: 'Calamba, Laguna', size: '5kW Residential', status: 'In Progress', progress: 30, description: 'Residential rooftop setup with premium mono-crystalline panels.', startDate: '2026-04-01', engineer: 'Engr. David Santos', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400' },
    { id: 4, client: 'Green Meadows', location: 'Cabuyao, Laguna', size: '10kW On-Grid', status: 'Completed', progress: 100, description: 'On-grid residential system with net-metering capabilities.', startDate: '2026-01-20', engineer: 'Engr. Mike Reyes' },
  ]);
  selectedAdminProject = signal<DashboardProject | null>(null);
  selectedViewImage = signal<string | null>(null);
  
  projectFilter = signal('');
  projectSort = signal<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  projectExportStatus = signal<'All' | 'In Progress' | 'Completed'>('All');

  serviceJobFilter = signal('');
  serviceJobSort = signal<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  serviceExportStatus = signal<'All' | 'Pending' | 'Scheduled' | 'In Progress' | 'Completed'>('All');
  selectedServiceJob = signal<ServiceJob | null>(null);

  adminServiceJobs = signal<ServiceJob[]>([
    { id: 101, clientName: 'John Doe', serviceType: 'Maintenance & Repair', status: 'Scheduled', scheduledDate: '2026-05-10', location: 'Calamba, Laguna', technician: 'Mark T.', notes: 'General system cleanup and filter replacement.', contactNumber: '09123456789' },
    { id: 102, clientName: 'Maria Cruz', serviceType: 'Wiring & Electrical Setup', status: 'Pending', scheduledDate: '2026-05-12', location: 'Santa Rosa, Laguna', technician: 'Unassigned', notes: 'New outlet installation in backyard.', contactNumber: '09876543210' },
    { id: 103, clientName: 'ABC Corp', serviceType: 'Volt Switch Panels', status: 'In Progress', scheduledDate: '2026-04-28', location: 'Biñan, Laguna', technician: 'Sarah L.', notes: 'Installing custom switch panel for data center.', contactNumber: '09112223334' },
    { id: 104, clientName: 'Roberto Santos', serviceType: 'Solar System Installation', status: 'Completed', scheduledDate: '2026-04-20', location: 'Cabuyao, Laguna', technician: 'David S.', notes: 'Final walkthrough and customer orientation done.', contactNumber: '09556667778' }
  ]);
  
  filteredProjects = computed(() => {
    let result = [...this.adminDashboardProjects()];
    const filter = this.projectFilter().toLowerCase();
    
    if (filter) {
      result = result.filter(p => 
        p.client.toLowerCase().includes(filter) || 
        p.location.toLowerCase().includes(filter) ||
        p.status.toLowerCase().includes(filter)
      );
    }
    
    const sort = this.projectSort();
    if (sort) {
      result.sort((a, b) => {
        const key = sort.key as keyof DashboardProject;
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';
        if (valA === null || valB === null) return 0;
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  filteredServiceJobs = computed(() => {
    let result = [...this.adminServiceJobs()];
    const filter = this.serviceJobFilter().toLowerCase();

    if (filter) {
      result = result.filter(j =>
        j.clientName.toLowerCase().includes(filter) ||
        j.location.toLowerCase().includes(filter) ||
        j.serviceType.toLowerCase().includes(filter) ||
        j.status.toLowerCase().includes(filter) ||
        j.technician.toLowerCase().includes(filter)
      );
    }

    const sort = this.serviceJobSort();
    if (sort) {
      result.sort((a, b) => {
        const key = sort.key as keyof ServiceJob;
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  serviceFilter = signal('');
  serviceSort = signal<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  filteredServices = computed(() => {
    let result = [...this.adminServices()];
    const filter = this.serviceFilter().toLowerCase();
    
    if (filter) {
      result = result.filter(s => 
        s.title.toLowerCase().includes(filter) || 
        s.description.toLowerCase().includes(filter)
      );
    }
    
    const sort = this.serviceSort();
    if (sort) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.sort((a: any, b: any) => {
        const valA = a[sort.key];
        const valB = b[sort.key];
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  productFilter = signal('');
  productSort = signal<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  filteredProducts = computed(() => {
    let result = [...this.adminProducts()];
    const filter = this.productFilter().toLowerCase();
    
    if (filter) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(filter) || 
        p.category.toLowerCase().includes(filter) ||
        p.desc.toLowerCase().includes(filter)
      );
    }
    
    const sort = this.productSort();
    if (sort) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.sort((a: any, b: any) => {
        const valA = a[sort.key];
        const valB = b[sort.key];
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  });

  // --- Services Management ---
  adminServices = signal([
    {
      id: 'solar-installation',
      title: 'Solar System Installation',
      icon: 'solar_power',
      image: '',
      description: 'Full-scale solar energy systems for homes and businesses, designed for maximum ROI.',
      features: ['Site Assessment', 'Custom System Design', 'Professional Mounting', 'Grid Connection']
    },
    {
      id: 'wiring-setup',
      title: 'Wiring & Electrical Setup',
      icon: 'electrical_services',
      image: '',
      description: 'Expert wiring services for new constructions and solar integration.',
      features: ['Industrial Wiring', 'Residential Setups', 'Safety Audits', 'Load Balancing']
    },
    {
      id: 'battery-supply',
      title: 'Battery Supply & Setup',
      icon: 'battery_saver',
      image: '',
      description: 'Reliable energy storage solutions to keep your power running 24/7.',
      features: ['Lithium-Ion Banks', 'Inverter Integration', 'Backup Configuration', 'Capacity Planning']
    },
    {
      id: 'volt-switch-panels',
      title: 'Volt Switch Panels',
      icon: 'dashboard_customize',
      image: '',
      description: 'Custom-built switch panels for efficient power distribution and control.',
      features: ['Custom Fabrication', 'Smart Monitoring', 'Circuit Protection', 'Easy Maintenance']
    },
    {
      id: 'solar-panel-supply',
      title: 'Solar Panel Supply',
      icon: 'grid_view',
      image: '',
      description: 'High-efficiency monocrystalline and polycrystalline panels from top brands.',
      features: ['Tier 1 Manufacturers', 'Warranty Support', 'Bulk Supplies', 'Performance Testing']
    },
    {
      id: 'maintenance-repair',
      title: 'Maintenance & Repair',
      icon: 'build',
      image: '',
      description: 'Keep your system running at peak performance with our regular checkups.',
      features: ['Panel Cleaning', 'Wiring Inspection', 'Performance Tuning', 'Emergency Repairs']
    }
  ]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedService = signal<any>(null);

  createNewService() {
    this.selectedService.set({
      id: '',
      title: 'New Service',
      icon: 'star',
      image: '',
      description: '',
      features: []
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editService(srv: any) {
    this.selectedService.set(JSON.parse(JSON.stringify(srv)));
  }

  updateFeatures(val: string) {
    if (this.selectedService()) {
      this.selectedService()!.features = val.split(',').map(s => s.trim()).filter(s => s);
    }
  }

  addServiceProcess() {
    if (this.selectedService()) {
      if (!this.selectedService()!.process) {
        this.selectedService()!.process = [];
      }
      this.selectedService()!.process.push({ title: '', desc: '' });
    }
  }

  removeServiceProcess(index: number) {
    if (this.selectedService() && this.selectedService()!.process) {
      this.selectedService()!.process.splice(index, 1);
    }
  }

  showServicePreview = signal(false);
  showProductPreview = signal(false);
  notificationMessage = signal('');

  previewServicesList = computed(() => {
    const currentList = this.adminServices();
    const editing = this.selectedService();
    if (!editing) return currentList;
    
    if (!editing.id) {
      const newService = { ...editing, id: editing.title.toLowerCase().replace(/[^a-z0-9]/g, '-') };
      return [newService, ...currentList];
    } else {
      return currentList.map(item => item.id === editing.id ? editing : item);
    }
  });

  previewProductsList = computed(() => {
    const currentList = this.adminProducts();
    const editing = this.selectedProduct();
    if (!editing) return currentList;

    if (!editing.id) {
      const newProd = { ...editing, id: editing.name.toLowerCase().replace(/[^a-z0-9]/g, '-') };
      return [newProd, ...currentList];
    } else {
      return currentList.map(item => item.id === editing.id ? editing : item);
    }
  });

  confirmSaveService() {
    this.showServicePreview.set(true);
  }

  confirmSaveProduct() {
      if (confirm('Are you sure you want to save your product changes?')) {
          this.showProductPreview.set(true);
      }
  }

  cancelPreviewService() {
    this.showServicePreview.set(false);
  }

  cancelPreviewProduct() {
    this.showProductPreview.set(false);
  }

  showNotification(msg: string) {
    this.notificationMessage.set(msg);
    setTimeout(() => this.notificationMessage.set(''), 3000);
  }

  async downloadProjectsPDF() {
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF();
    let projects = this.filteredProjects();
    const statusFilter = this.projectExportStatus();

    if (statusFilter !== 'All') {
      projects = projects.filter(p => p.status === statusFilter);
    }
    
    doc.setFontSize(18);
    doc.text(`Blucid Integrated - Project Records (${statusFilter})`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const tableData = projects.map(p => [
      p.id || '',
      p.client,
      p.location,
      p.status,
      p.startDate
    ]);
    
    autoTable(doc, {
      startY: 40,
      head: [['ID', 'Client', 'Location', 'Status', 'Start Date']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
      styles: { fontSize: 9 }
    });
    
    doc.save('Blucid_Project_Records.pdf');
    this.addSystemNotification('Report Generated', `Exported ${projects.length} project records to PDF.`, 'picture_as_pdf', 'bg-blue-50 text-blue-600');
  }

  async downloadServiceJobsPDF() {
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF();
    let jobs = this.filteredServiceJobs();
    const statusFilter = this.serviceExportStatus();

    if (statusFilter !== 'All') {
      jobs = jobs.filter(j => j.status === statusFilter);
    }
    
    doc.setFontSize(18);
    doc.text(`Blucid Integrated - Service Jobs (${statusFilter})`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const tableData = jobs.map(j => [
      `#${j.id}`,
      j.clientName,
      j.serviceType,
      j.scheduledDate,
      j.location,
      j.technician,
      j.status
    ]);
    
    autoTable(doc, {
      startY: 40,
      head: [['Job ID', 'Client', 'Service Type', 'Date', 'Location', 'Technician', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
      styles: { fontSize: 9 }
    });
    
    doc.save('Blucid_Service_Records.pdf');
    this.addSystemNotification('Report Generated', `Exported ${jobs.length} service job records to PDF.`, 'picture_as_pdf', 'bg-indigo-50 text-indigo-600');
  }

  saveService() {
    const srv = this.selectedService();
    if (!srv.id) {
      srv.id = srv.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      this.adminServices.update(list => [srv, ...list]);
      this.addSystemNotification('Service Added', `New technical service "${srv.title}" added.`, 'add_circle', 'bg-primary/10 text-primary');
    } else {
      this.adminServices.update(list => list.map(item => item.id === srv.id ? srv : item));
      this.addSystemNotification('Service Updated', `Service details for "${srv.title}" updated.`, 'edit', 'bg-slate-100 text-slate-600');
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_services', JSON.stringify(this.adminServices()));
    }
    this.showServicePreview.set(false);
    this.selectedService.set(null);
    this.showNotification('Successfully saved service!');
  }

  deleteService() {
    const srv = this.selectedService();
    if (srv && srv.id) {
      this.adminServices.update(list => list.filter(item => item.id !== srv.id));
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('blucid_services', JSON.stringify(this.adminServices()));
      }
      this.addSystemNotification('Service Removed', `Service "${srv.title}" has been deleted from the system.`, 'delete_sweep', 'bg-rose-100 text-rose-600');
    }
    this.selectedService.set(null);
  }

  // --- Products Management ---
  adminProducts = signal([
    {
      id: 'mono-crystalline-550w',
      name: 'Blucid Mono-Crystalline 550W',
      category: 'Solar Panels',
      desc: 'High-efficiency monocrystalline panel with PERC technology for maximum energy yield.',
      inStock: true,
      stockCount: 45,
      images: [
        'https://www.seaforestpv.com/uploadfile/202104/15/c198d017f8916bec19d695977febcca9_medium.jpg'
      ],
      specs: [
        { label: 'Max Power', value: '550W' },
        { label: 'Efficiency', value: '21.3%' },
        { label: 'Cell Type', value: 'Monocrystalline' },
        { label: 'Dimensions', value: '2279 x 1134 x 35mm' },
        { label: 'Weight', value: '21.5kg' },
        { label: 'Warranty', value: '25 Years' }
      ],
      features: [
        { icon: 'verified', text: 'Genuine Product' },
        { icon: 'local_shipping', text: 'Laguna Delivery' }
      ]
    },
    {
      id: 'lithium-battery-10kwh',
      name: 'Lithium Iron Phosphate 10kWh',
      category: 'Batteries',
      desc: 'Deep cycle LFP battery bank with built-in BMS and 6000+ cycle life.',
      inStock: true,
      stockCount: 12,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRhO8GSDAFs44Gvq8NM_PFZM9bF86yBWf3xQ&s'
      ],
      specs: [
        { label: 'Capacity', value: '10kWh' },
        { label: 'Voltage', value: '48V' },
        { label: 'Cycle Life', value: '6000+ Cycles' },
        { label: 'Chemistry', value: 'LiFePO4' }
      ],
      features: [
        { icon: 'verified', text: '5-Year Warranty' },
        { icon: 'bolt', text: 'High Efficiency' }
      ]
    },
    {
      id: 'smart-volt-switch-v2',
      name: 'Smart Volt Switch Panel V2',
      category: 'Switch Panels',
      desc: 'Custom-engineered switch panel with IoT monitoring and automatic transfer switch.',
      inStock: false,
      stockCount: 0,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pUJXe4qBbGMK5NTZ_Gd3qVH8jgfQTRvckg&s'
      ],
      specs: []
    },
    {
      id: 'hybrid-solar-inverter-5kw',
      name: 'Hybrid Solar Inverter 5kW',
      category: 'Accessories',
      desc: 'Pure sine wave hybrid inverter with dual MPPT trackers and mobile app monitoring.',
      inStock: true,
      stockCount: 22,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyH5UkAXeML7Om7yPwDB0jMP6WnyfaGuwH8w&s'
      ],
      specs: []
    },
    {
      id: 'blucid-poly-crystalline-400w',
      name: 'Blucid Poly-Crystalline 400W',
      category: 'Solar Panels',
      desc: 'Durable and cost-effective polycrystalline panel for residential installations.',
      inStock: true,
      stockCount: 80,
      images: [
        'https://image.made-in-china.com/202f0j00MUuoJWGsagpf/PV-Panels-400W-Watt-Polycrystalline-Solar-Panels-with-72-Cells-for-Solar-Power-System-with-Solar-Inverter.webp'
      ],
      specs: []
    },
    {
      id: 'solar-mounting-rail-system',
      name: 'Solar Mounting Rail System',
      category: 'Accessories',
      desc: 'Anodized aluminum mounting rails with high wind resistance and easy installation.',
      inStock: true,
      stockCount: 150,
      images: [
        'https://www.solarpartscomponents.com/wp-content/uploads/2018/08/solar-mounting-rail-SPC-R001.jpg'
      ],
      specs: []
    }
  ]);

  availableCategories = computed(() => {
    const cats = this.adminProducts().map(p => p.category);
    return [...new Set(cats)];
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedProduct = signal<any>(null);

  createNewProduct() {
    this.selectedProduct.set({
      id: '',
      name: 'New Product',
      category: 'Accessories',
      desc: '',
      inStock: true,
      stockCount: 0,
      images: ['https://picsum.photos/seed/newproduct/800/800'],
      specs: [{ label: '', value: '' }],
      features: [
        { icon: 'verified', text: 'Genuine Product' },
        { icon: 'local_shipping', text: 'Laguna Delivery' }
      ]
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editProduct(prod: any) {
    this.selectedProduct.set(JSON.parse(JSON.stringify(prod)));
  }

  addProductImage() {
    if (this.selectedProduct()) {
      if (!this.selectedProduct()!.images) {
        this.selectedProduct()!.images = [];
      }
      this.selectedProduct()!.images.push('');
    }
  }

  removeProductImage(index: number) {
    if (this.selectedProduct() && this.selectedProduct()!.images) {
      this.selectedProduct()!.images.splice(index, 1);
    }
  }

  addProductSpec() {
    if (this.selectedProduct()) {
      if (!this.selectedProduct()!.specs) {
        this.selectedProduct()!.specs = [];
      }
      this.selectedProduct()!.specs.push({ label: '', value: '' });
    }
  }

  removeProductSpec(index: number) {
    if (this.selectedProduct() && this.selectedProduct()!.specs) {
      this.selectedProduct()!.specs.splice(index, 1);
    }
  }

  addProductFeature() {
    if (this.selectedProduct()) {
      if (!this.selectedProduct()!.features) {
        this.selectedProduct()!.features = [];
      }
      this.selectedProduct()!.features.push({ icon: 'verified', text: '' });
    }
  }

  removeProductFeature(index: number) {
    if (this.selectedProduct() && this.selectedProduct()!.features) {
      this.selectedProduct()!.features.splice(index, 1);
    }
  }

  getSafeData(tab: string) {
    const data = (this.websiteData() as any)[tab]; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!data) return { bannerImage: '' };
    if (data.bannerImage === undefined) data.bannerImage = '';
    return data;
  }

  saveProduct() {
    const prod = this.selectedProduct();
    if (!prod) return;
    if (!prod.id) {
      prod.id = prod.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      this.adminProducts.update(list => [prod, ...list]);
      this.addSystemNotification('New Product Added', `Added ${prod.name} to the website catalog.`, 'inventory_2', 'bg-emerald-100 text-emerald-600');
    } else {
      this.adminProducts.update(list => list.map(item => item.id === prod.id ? prod : item));
      this.addSystemNotification('Product Updated', `Updated specifications for ${prod.name}.`, 'edit', 'bg-slate-100 text-slate-600');
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_products', JSON.stringify(this.adminProducts()));
    }
    this.showProductPreview.set(false);
    this.selectedProduct.set(null);
    this.showNotification('Successfully saved product!');
  }

  deleteProduct() {
    const prod = this.selectedProduct();
    if (prod && prod.id) {
      if (confirm(`Are you sure you want to delete the product "${prod.name}"? This action cannot be undone.`)) {
        this.adminProducts.update(list => list.filter(item => item.id !== prod.id));
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('blucid_products', JSON.stringify(this.adminProducts()));
        }
        this.selectedProduct.set(null);
        this.addSystemNotification('Product Deleted', `${prod.name} removed from inventory.`, 'delete', 'bg-rose-100 text-rose-600');
        this.showNotification('Product successfully deleted!');
      }
    } else if (prod) {
      // New product not yet saved
      this.selectedProduct.set(null);
    }
  }

  saveAdminProfile() {
    if (isPlatformBrowser(this.platformId)) {
       localStorage.setItem('blucid_admin_profile', JSON.stringify(this.adminProfile()));
    }
    this.addSystemNotification('Profile Updated', 'Your administrative contact and profile details have been saved.', 'person', 'bg-purple-100 text-purple-600');
    this.showNotification('Profile successfully updated!');
  }

  // --- Service Jobs Management ---
  openAddServiceJob() {
    this.selectedServiceJob.set({
      id: 0,
      clientName: '',
      serviceType: 'Maintenance & Repair',
      status: 'Pending',
      scheduledDate: new Date().toISOString().split('T')[0],
      location: '',
      technician: 'Unassigned',
      notes: '',
      contactNumber: ''
    });
  }

  editServiceJob(job: ServiceJob) {
    this.selectedServiceJob.set({ ...job });
  }

  saveServiceJob() {
    const job = this.selectedServiceJob();
    if (!job) return;

    if (job.id === 0) {
      // Create new
      const newJob = { ...job, id: Date.now() };
      this.adminServiceJobs.update(jobs => [newJob, ...jobs]);
      this.addSystemNotification('Job Order Created', `New service request filed for ${job.clientName}.`, 'engineering', 'bg-blue-100 text-blue-600');
      this.showNotification('Service job created successfully!');
    } else {
      // Update existing
      this.adminServiceJobs.update(jobs => jobs.map(j => j.id === job.id ? job : j));
      this.addSystemNotification('Job Order Updated', `Service job status or details for #${job.id} updated.`, 'assignment_turned_in', 'bg-slate-100 text-slate-600');
      this.showNotification('Service job updated successfully!');
    }
    this.selectedServiceJob.set(null);
  }

  deleteServiceJob(id: number) {
    if (confirm('Are you sure you want to delete this service job order?')) {
      this.adminServiceJobs.update(jobs => jobs.filter(j => j.id !== id));
      this.addSystemNotification('Job Order Cancelled', `Service job #${id} has been removed from the schedule.`, 'event_busy', 'bg-rose-100 text-rose-600');
      this.showNotification('Service job deleted.');
      this.selectedServiceJob.set(null);
    }
  }

  saveSystemSettings() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('blucid_settings', JSON.stringify(this.settingsData()));
    }
    this.addSystemNotification('Settings Applied', 'System-wide preferences and notification settings updated.', 'settings', 'bg-slate-100 text-slate-600');
    this.showNotification('System settings applied successfully!');
  }

  clearAllNotifications() {
    this.notifications.set([]);
    this.showNotification('All notifications cleared.');
  }

  removeNotification(id: number) {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  exportCSV() {
    this.showNotification('Preparing CSV export...');
    setTimeout(() => {
      const data = "Date,Activity,Status\n2026-04-22,System Check,Success\n2026-04-21,Backup,Success";
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'blucid_system_audit.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.showNotification('Audit log exported successfully!');
    }, 1500);
  }

  clearDrafts() {
    if (confirm('Are you sure you want to clear all website drafts? This cannot be undone.')) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('blucid_website_draft');
      }
      this.showNotification('Website drafts cleared successfully!');
    }
  }

  triggerSync() {
    this.showNotification('Initializing database synchronization...');
    // Simulate sync
    setTimeout(() => {
      this.showNotification('Database successfully synchronized with cloud!');
    }, 2000);
  }

  moveProductImage(index: number, direction: 'up' | 'down') {
    const prod = this.selectedProduct();
    if (!prod || !prod.images) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= prod.images.length) return;
    
    const images = [...prod.images];
    [images[index], images[newIndex]] = [images[newIndex], images[index]];
    prod.images = images;
  }

  isDraggingImages = signal(false);

  onFilesDropped(event: DragEvent, contextType: 'service' | 'product' | 'website' | 'admin-project' | 'admin-avatar', index = 0, websiteTab = '', galleryIndex?: number) {
    event.preventDefault();
    this.isDraggingImages.set(false);
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleMultipleFiles(files, contextType, index, websiteTab, galleryIndex);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingImages.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingImages.set(false);
  }

  onImageUpload(event: Event, contextType: 'service' | 'product' | 'website' | 'admin-project' | 'admin-avatar', index = 0, websiteTab = '', galleryIndex?: number) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.handleMultipleFiles(files, contextType, index, websiteTab, galleryIndex);
    }
  }

  private handleMultipleFiles(files: FileList, contextType: 'service' | 'product' | 'website' | 'admin-project' | 'admin-avatar', index = 0, websiteTab = '', galleryIndex?: number) {
    Array.from(files).forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64string = e.target?.result as string;
        const targetIndex = (contextType === 'product' && files.length > 1) ? index + i : index;
        this.applyImageChange(base64string, contextType, targetIndex, websiteTab, galleryIndex);
      };
      reader.readAsDataURL(file);
    });
  }

  private applyImageChange(base64string: string, contextType: 'service' | 'product' | 'website' | 'admin-project' | 'admin-avatar', index = 0, websiteTab = '', galleryIndex?: number) {
    if (contextType === 'admin-avatar') {
      this.adminProfile.update(p => ({ ...p, avatarImage: base64string }));
    } else if (contextType === 'service' && this.selectedService()) {
      this.selectedService()!.image = base64string;
    } else if (contextType === 'product' && this.selectedProduct()) {
      if (!this.selectedProduct()!.images) this.selectedProduct()!.images = [];
      if (index >= this.selectedProduct()!.images.length) {
        this.selectedProduct()!.images.push(base64string);
      } else {
        this.selectedProduct()!.images[index] = base64string;
      }
    } else if (contextType === 'admin-project' && this.selectedAdminProject()) {
      this.selectedAdminProject.update(proj => ({ ...proj!, image: base64string }));
    } else if (contextType === 'website') {
      this.websiteData.update(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyData = data as any;
        if (websiteTab === 'home-project') {
           if (!anyData.home.projects) anyData.home.projects = [];
           if (anyData.home.projects[index]) {
             anyData.home.projects[index].image = base64string;
           }
        } else if (websiteTab === 'home-hero') {
           if (!anyData.home.heroImages) anyData.home.heroImages = [];
           anyData.home.heroImages[index] = base64string;
           if (index === 0) anyData.home.bannerImage = base64string;
        } else if (websiteTab === 'home-project-gallery' && galleryIndex !== undefined) {
           if (!anyData.home.projects) anyData.home.projects = [];
           if (anyData.home.projects[index] && anyData.home.projects[index].gallery) {
             anyData.home.projects[index].gallery[galleryIndex] = base64string;
           }
        } else if (websiteTab === 'testimonial') {
           if (!anyData.home.testimonials) anyData.home.testimonials = [];
           if (anyData.home.testimonials[index]) {
             anyData.home.testimonials[index].image = base64string;
           }
        } else if (websiteTab === 'home-brand') {
           if (!anyData.home.brands) anyData.home.brands = [];
           if (anyData.home.brands[index]) {
             anyData.home.brands[index].img = base64string;
           }
        } else {
          if (!anyData[websiteTab]) {
             anyData[websiteTab] = {};
          }
          anyData[websiteTab].bannerImage = base64string;
        }
        return { ...data };
      });
    }
  }
}

