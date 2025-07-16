<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\User;
use App\Models\Product;
use App\Models\Appointment;
use App\Models\Surgery;
use App\Models\Invoice;
use App\Models\Employee;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Get current date for filtering
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();
        $thisYear = Carbon::now()->startOfYear();

        // Patient Statistics
        $totalPatients = Patient::count();
        $newPatientsThisMonth = Patient::where('created_at', '>=', $thisMonth)->count();
        $activePatientsThisYear = Patient::where('status', 'active')
            ->where('created_at', '>=', $thisYear)->count();

        // Appointment Statistics
        $todaysAppointments = Appointment::whereDate('scheduled_at', $today)->count();
        $upcomingAppointments = Appointment::where('scheduled_at', '>', now())
            ->where('status', 'scheduled')->count();
        $completedAppointmentsThisMonth = Appointment::where('status', 'completed')
            ->where('created_at', '>=', $thisMonth)->count();

        // Surgery Statistics
        $surgeriesThisMonth = Surgery::where('created_at', '>=', $thisMonth)->count();
        $scheduledSurgeries = Surgery::where('status', 'scheduled')->count();
        $completedSurgeriesThisYear = Surgery::where('status', 'completed')
            ->where('created_at', '>=', $thisYear)->count();

        // Financial Statistics
        $totalRevenue = Invoice::where('status', 'paid')->sum('total_amount');
        $revenueThisMonth = Invoice::where('status', 'paid')
            ->where('created_at', '>=', $thisMonth)->sum('total_amount');
        $pendingInvoices = Invoice::where('status', 'sent')->sum('total_amount');
        $totalExpenses = Expense::where('status', 'approved')->sum('amount');

        // Inventory Statistics
        $totalProducts = Product::where('is_active', true)->count();
        $lowStockProducts = Product::whereRaw('current_stock <= minimum_stock')
            ->where('is_active', true)->count();
        $expiringSoon = Product::where('expiry_date', '<=', Carbon::now()->addDays(30))
            ->where('is_active', true)->count();

        // Staff Statistics
        $totalStaff = User::where('is_active', true)->count();
        $activeEmployees = Employee::count(); // Simplified for now

        // Recent Activities
        $recentPatients = Patient::with(['appointments' => function($query) {
            $query->latest()->limit(1);
        }])->latest()->limit(5)->get();

        $todaysSchedule = Appointment::with(['patient', 'doctor'])
            ->whereDate('scheduled_at', $today)
            ->orderBy('scheduled_at')
            ->limit(10)->get();

        $lowStockItems = Product::whereRaw('current_stock <= minimum_stock')
            ->where('is_active', true)
            ->orderBy('current_stock')
            ->limit(5)->get();

        // Monthly Revenue Chart Data (last 6 months)
        $monthlyRevenue = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $revenue = Invoice::where('status', 'paid')
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('total_amount');

            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'revenue' => $revenue
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'patients' => [
                    'total' => $totalPatients,
                    'new_this_month' => $newPatientsThisMonth,
                    'active_this_year' => $activePatientsThisYear,
                ],
                'appointments' => [
                    'today' => $todaysAppointments,
                    'upcoming' => $upcomingAppointments,
                    'completed_this_month' => $completedAppointmentsThisMonth,
                ],
                'surgeries' => [
                    'this_month' => $surgeriesThisMonth,
                    'scheduled' => $scheduledSurgeries,
                    'completed_this_year' => $completedSurgeriesThisYear,
                ],
                'financial' => [
                    'total_revenue' => $totalRevenue,
                    'revenue_this_month' => $revenueThisMonth,
                    'pending_invoices' => $pendingInvoices,
                    'total_expenses' => $totalExpenses,
                ],
                'inventory' => [
                    'total_products' => $totalProducts,
                    'low_stock' => $lowStockProducts,
                    'expiring_soon' => $expiringSoon,
                ],
                'staff' => [
                    'total' => $totalStaff,
                    'active_employees' => $activeEmployees,
                ],
            ],
            'recent_activities' => [
                'patients' => $recentPatients,
                'todays_schedule' => $todaysSchedule,
                'low_stock_items' => $lowStockItems,
            ],
            'charts' => [
                'monthly_revenue' => $monthlyRevenue,
            ],
        ]);
    }
}
