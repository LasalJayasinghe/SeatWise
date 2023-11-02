<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class RecommendationController extends Controller
{
    public function getRecommendedUsers($id)
    {
        $user = User::findOrFail($id);

        $userFeatures = $this->extractFeatures($user);

        $allUsers = User::all();

        $recommendedUsers = $this->calculateUserSimilarity($userFeatures, $allUsers);
        return response()->json($recommendedUsers);
    }

    private function extractFeatures($user)
    {
        // Extract relevant features from the meal (e.g., meal type, category, etc.)
        $features = [
            'hometown' => $user->hometown,
            'mealPreference' => $user->mealPreferences,
            // Add more features as needed
        ];

        return implode(' ', $features);
    }

    private function calculateUserSimilarity($userFeatures, $allUsers)
    {
        $similarUsers = [];

        foreach ($allUsers as $user) {
            // Extract relevant user features (e.g., restaurant type, location, etc.)
            $accountFeatures = $this->extractFeatures($user);

            // Calculate the similarity between meal and restaurant based on features (e.g., using a similarity metric)
            $similarityScore = $this->calculateSimilarity($userFeatures, $accountFeatures);

            $similarUsers[] = [
                'userID' => $user->id,
                'userName' => $user->firstname,
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