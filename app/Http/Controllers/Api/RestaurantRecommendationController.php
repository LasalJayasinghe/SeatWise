<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Restaurants;

class RestaurantRecommendationController extends Controller
{
    public function getRecommendedRestaurants($id)
    {
        $user = User::findOrFail($id);

        $userFeatures = $this->extractFeatures($user);

        $allRestaurants = Restaurants::all();

        $recommendedRes = $this->calculateUserSimilarity($userFeatures, $allRestaurants);
        return response()->json($recommendedRes);
    }

    private function extractFeatures($user)
    {
        // Extract relevant features from the meal (e.g., meal type, category, etc.)
        $features = [
            'cuisineType' => $user->cuisineType,
            'mealPreference' => $user->mealPreferences,
            'beverageType' => $user->beverageType,
            'restaurantType' => $user->restaurantType,
            // Add more features as needed
        ];

        return implode(' ', $features);
    }

    private function calculateUserSimilarity($userFeatures, $allUsers)
    {
        $similarUsers = [];

        foreach ($allUsers as $user) {
            $accountFeatures = $this->extractFeatures($user);

            $similarityScore = $this->calculateSimilarity($userFeatures, $accountFeatures);

            $similarUsers[] = [
                'resID' => $user->id,
                'resName' => $user->restaurantname,
                'similarity_score' => $similarityScore,
            ];
        }

        usort($similarUsers, function ($a, $b) {
            return $b['similarity_score'] <=> $a['similarity_score'];
        });
        
        $similarUsers = array_slice($similarUsers, 0, 5);


        return $similarUsers;
    }

        private function calculateSimilarity($features1, $features2)
    {
        // Tokenize the feature strings into arrays of words
        $words1 = explode(' ', $features1);
        $words2 = explode(' ', $features2);

        // Count the occurrences of each word in both feature vectors
        $wordCount1 = array_count_values($words1);
        $wordCount2 = array_count_values($words2);

        // Calculate the dot product and magnitudes of the feature vectors
        $dotProduct = 0;
        $magnitude1 = 0;
        $magnitude2 = 0;

        foreach ($words1 as $word) {
            if (isset($wordCount2[$word])) {
                $dotProduct += $wordCount1[$word] * $wordCount2[$word];
            }
            $magnitude1 += $wordCount1[$word] * $wordCount1[$word];
        }

        foreach ($words2 as $word) {
            $magnitude2 += $wordCount2[$word] * $wordCount2[$word];
        }

        // Calculate the cosine similarity score
        if ($magnitude1 == 0 || $magnitude2 == 0) {
            return 0; // Handle division by zero (optional)
        }
        

        return $dotProduct / (sqrt($magnitude1) * sqrt($magnitude2));
    }

}