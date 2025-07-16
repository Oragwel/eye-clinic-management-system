<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Surgery;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        // Date ranges
        $today = Carbon::today();
        $thisWeek = Carbon::now()->startOfWeek();
        $thisMonth = Carbon::now()->startOfMonth();
        $thisYear = Carbon::now()->startOfYear();

        // Patient Analytics
        $patientStats = [
            'total' => Patient::count(),
            'new_this_month' => Patient::where('created_at', '>=', $thisMonth)->count(),
            'active' => Patient::where('status', 'active')->count(),
            'by_gender' => Patient::selectRaw('gender, COUNT(*) as count')
                ->groupBy('gender')->get(),
            'by_age_group' => $this->getPatientsByAgeGroup(),
        ];

        // Appointment Analytics
        $appointmentStats = [
            'total' => Appointment::count(),
            'this_week' => Appointment::where('scheduled_at', '>=', $thisWeek)->count(),
            'completed' => Appointment::where('status', 'completed')->count(),
            'by_type' => Appointment::selectRaw('type, COUNT(*) as count')
                ->groupBy('type')->get(),
            'by_status' => Appointment::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')->get(),
        ];

        // Surgery Analytics
        $surgeryStats = [
            'total' => Surgery::count(),
            'this_month' => Surgery::where('scheduled_at', '>=', $thisMonth)->count(),
            'completed' => Surgery::where('status', 'completed')->count(),
            'by_urgency' => Surgery::selectRaw('urgency, COUNT(*) as count')
                ->groupBy('urgency')->get(),
            'by_eye' => Surgery::selectRaw('eye_operated, COUNT(*) as count')
                ->groupBy('eye_operated')->get(),
        ];

        // Financial Analytics
        $financialStats = [
            'total_revenue' => Invoice::where('status', 'paid')->sum('total_amount'),
            'revenue_this_month' => Invoice::where('status', 'paid')
                ->where('created_at', '>=', $thisMonth)->sum('total_amount'),
            'pending_amount' => Invoice::where('status', 'sent')->sum('total_amount'),
            'overdue_amount' => Invoice::where('status', 'overdue')->sum('total_amount'),
            'monthly_revenue' => $this->getMonthlyRevenue(),
        ];

        // Inventory Analytics
        $inventoryStats = [
            'total_products' => Product::where('is_active', true)->count(),
            'low_stock' => Product::whereRaw('current_stock <= minimum_stock')
                ->where('is_active', true)->count(),
            'out_of_stock' => Product::where('current_stock', 0)
                ->where('is_active', true)->count(),
            'expiring_soon' => Product::where('expiry_date', '<=', Carbon::now()->addDays(30))
                ->where('is_active', true)->count(),
            'by_category' => Product::selectRaw('category, COUNT(*) as count')
                ->where('is_active', true)->groupBy('category')->get(),
        ];

        // Staff Analytics
        $staffStats = [
            'total' => User::where('is_active', true)->count(),
            'by_role' => User::selectRaw('role, COUNT(*) as count')
                ->where('is_active', true)->groupBy('role')->get(),
        ];

        return Inertia::render('Reports/Index', [
            'patientStats' => $patientStats,
            'appointmentStats' => $appointmentStats,
            'surgeryStats' => $surgeryStats,
            'financialStats' => $financialStats,
            'inventoryStats' => $inventoryStats,
            'staffStats' => $staffStats,
        ]);
    }

    private function getPatientsByAgeGroup()
    {
        $patients = Patient::all();
        $ageGroups = [
            '0-18' => 0,
            '19-35' => 0,
            '36-50' => 0,
            '51-65' => 0,
            '65+' => 0,
        ];

        foreach ($patients as $patient) {
            $age = Carbon::parse($patient->date_of_birth)->age;
            if ($age <= 18) $ageGroups['0-18']++;
            elseif ($age <= 35) $ageGroups['19-35']++;
            elseif ($age <= 50) $ageGroups['36-50']++;
            elseif ($age <= 65) $ageGroups['51-65']++;
            else $ageGroups['65+']++;
        }

        return collect($ageGroups)->map(function ($count, $group) {
            return ['age_group' => $group, 'count' => $count];
        })->values();
    }

    private function getMonthlyRevenue()
    {
        $monthlyRevenue = [];
        for ($i = 11; $i >= 0; $i--) {
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

        return $monthlyRevenue;
    }
}
